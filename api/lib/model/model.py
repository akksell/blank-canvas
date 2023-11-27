import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
import json
from numpy import dot
from numpy.linalg import norm
import os
import platform
from .helpers import convert_to_unix_path

class ImageEmbeddingModel:
  def __init__(self, folder):
    self.folder = folder
    model_path = os.path.join(folder, 'mobilenet_v3_small_075_224_embedder.tflite')

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

  def get_similar_images(self, image):
    data = {}

    with open(os.path.join(self.folder, 'embeddings.txt'), 'r') as fp:
      data = json.load(fp)

    if (platform.system() != 'Windows'):
      data = { convert_to_unix_path(key): value for key, value in data.items() }

    cosines = []
    with self.ImageEmbedder.create_from_options(self.options) as embedder:
      query_mp_image = mp.Image.create_from_file(image)
      query_embedding_result = embedder.embed(query_mp_image).embeddings[0].embedding.tolist()

      for name, embed in data.items():
        sim = self.cos_sim(query_embedding_result, embed)
        cosines.append({ 'filename': name, 'similarity': sim })

    cosines = sorted(cosines, key=lambda result: result['similarity'], reverse=True)
    return cosines