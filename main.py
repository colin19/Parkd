from flask import Flask, render_template, send_from_directory, jsonify, Response, request
import json
import os

# the all-important app variable:
app = Flask(__name__)

@app.route("/")
def splash_page():
	return render_template('index.html')

if __name__ == "__main__":
	app.run(host='0.0.0.0', debug=True, port=80)
