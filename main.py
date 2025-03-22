from flask import Flask, jsonify, render_template, request

app = Flask(__name__, static_url_path='/static')

@app.route('/')
@app.route('/aslml')
def aslml():
    return render_template('index.html')
