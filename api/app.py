from flask import Flask, jsonify, request, flash, redirect
import os
from werkzeug.utils import secure_filename
from lib.model.model import ImageEmbeddingModel

upload_folder = "upload_folder"

app = Flask(__name__)
app.config['upload_folder'] = upload_folder
app.config['model_folder'] = 'lib/model'
app.config['img_data_folder'] = '../client/public'
embedder = ImageEmbeddingModel(app.config['model_folder'], app.config['img_data_folder'])

@app.route('/query', methods = ['POST'])
def query():
  if request.method == 'POST':
    file = request.files['file']
    if file.filename == '':
      flash('No selected file')
      return redirect(request.url)
    
    try:
      filename = secure_filename(file.filename)
      filepath = os.path.join(app.config['upload_folder'], filename)
      file.save(filepath)
      similar_images = embedder.get_similar_images(filepath)
      return jsonify(similar_images[:20])
    except:
      return jsonify({
        'errors': [
            {
              'status': 500,
              'type': 'API.INTERNAL.ERR',
              'message': 'An error occurred. Please try again'
            }
          ]
      })


if __name__ == '__main__':
    app.run(debug=True)