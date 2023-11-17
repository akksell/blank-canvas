from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/test')
def hello():
  data = {
    'message': 'received data',
    'status': 200
  }
  return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)