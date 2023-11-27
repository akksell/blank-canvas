from flask import Flask, jsonify, request, flash, redirect
import os
from werkzeug.utils import secure_filename

upload_folder = "upload_folder"

app = Flask(__name__)
app.config['upload_folder'] = upload_folder

@app.route('/test')
def hello():
  data = {
    'message': 'received data',
    'status': 200
  }
  return jsonify(data)

@app.route('/upload')
def upload():
  return '''<!DOCTYPE html>
              <html>
                  <body>
                      <form action = "/query" method = "POST" 
                          enctype = "multipart/form-data">
                          <input type = "file" name = "file" />
                          <input type = "submit"/>
                      </form>   
                  </body>
              </html>'''

@app.route('/query', methods = ['GET', 'POST'])
def query():
  if request.method == 'POST':
    file = request.files['file']
    if file.filename == '':
      flash('No selected file')
      return redirect(request.url)
    else:
      filename = secure_filename(file.filename)
      file.save(os.path.join(app.config['upload_folder'], filename))
      return filename

if __name__ == '__main__':
    app.run(debug=True)