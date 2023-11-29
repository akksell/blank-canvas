import mediapipe as mp
import json
from numpy import dot
from numpy.linalg import norm
import os
import torch
import torch.nn as nn
import torchvision.transforms as T
from .helpers import convert_to_unix_path
from PIL import Image

classifications = {
  'donald': 0,
  'mickey': 1, 
  'minion': 2, 
  'olaf': 3, 
  'pooh': 4, 
  'pumba': 5
}

class Net(nn.Module):   
  def __init__(self):
    super(Net, self).__init__()

    self.cnn_layers = nn.Sequential(
      nn.Conv2d(3,4, kernel_size=3, stride=1, padding=1),
      nn.BatchNorm2d(4),
      nn.ReLU(inplace=True),
      nn.MaxPool2d(kernel_size=2, stride=2),
      nn.Conv2d(4, 4, kernel_size=3, stride=1, padding=1),
      nn.BatchNorm2d(4),
      nn.ReLU(inplace=True),
      nn.MaxPool2d(kernel_size=2, stride=2),
    )

    self.linear_layers = nn.Sequential(
      nn.Linear(4* 16 * 16, 6)
    )

  def forward(self, x):
    x = self.cnn_layers(x)
    x = x.view(x.size(0), -1)
    x = self.linear_layers(x)
    return x

class ImageEmbeddingModel:
  def __init__(self, model_folder, image_folder=""):
    self.model_folder = model_folder
    self.image_folder = image_folder
    model_path = os.path.join(model_folder, 'mobilenet_v3_small_075_224_embedder.tflite')
    neuralnet_path = os.path.join(model_folder, 'nn.pth')
    self.neuralnet = Net()
    self.neuralnet.load_state_dict(torch.load(neuralnet_path))

    BaseOptions = mp.tasks.BaseOptions
    self.ImageEmbedder = mp.tasks.vision.ImageEmbedder
    ImageEmbedderOptions = mp.tasks.vision.ImageEmbedderOptions
    VisionRunningMode = mp.tasks.vision.RunningMode

    self.options = ImageEmbedderOptions(
      base_options=BaseOptions(model_asset_path=model_path),
      quantize=True,
      running_mode=VisionRunningMode.IMAGE)  

  def cos_sim(self, a, b):
    return dot(a, b)/(norm(a)*norm(b))

  def get_class_and_probs(self, image):
    nn_image = Image.open(image).convert('RGB')
    nn_transform = T.Compose([
        T.Resize((64, 64)),
        T.ToTensor(),
        T.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
    ])
    nn_image = nn_transform(nn_image).unsqueeze(0)
    with torch.no_grad():
      output = self.neuralnet(nn_image)

    image_probabilities = torch.nn.functional.softmax(output[0], dim=0)
    predicted_class = torch.argmax(image_probabilities).item()
    return predicted_class, image_probabilities

  def get_similar_images(self, image):
    _, weights = self.get_class_and_probs(image)
    weights = weights.numpy()

    data = {}
    with open(os.path.join(self.model_folder, 'embeddings.txt'), 'r') as fp:
      data = json.load(fp)

    data = { convert_to_unix_path(key): value for key, value in data.items() }

    cosines = []
    with self.ImageEmbedder.create_from_options(self.options) as embedder:
      query_mp_image = mp.Image.create_from_file(image)
      query_embedding_result = embedder.embed(query_mp_image).embeddings[0].embedding.tolist()

      for name, embed in data.items():
        img_type = name.split('/')[2]
        img_class = classifications[img_type]
        weight = weights[img_class]

        sim = self.cos_sim(query_embedding_result, embed) * weight
        cosines.append({ 'filename': name, 'similarity': sim })

    cosines = sorted(cosines, key=lambda result: result['similarity'], reverse=True)
    return cosines