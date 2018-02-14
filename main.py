from flask import Flask, render_template, send_from_directory, jsonify, Response, request
import json
import os

# the all-important app variable:
app = Flask(__name__)

@app.route("/index.html")
def index():
	return render_template('index.html')

@app.route("/")
def splash_page():
	return render_template('index.html')

@app.route("/trucks.html")
def truck_page():
	return render_template("trucks.html")

@app.route("/truckDetail.html")
def truck_detail():
	return render_template("truckDetail.html")

if __name__ == "__main__":
	app.run(host='0.0.0.0', debug=True, port=80)
