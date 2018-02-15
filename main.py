from flask import Flask, render_template, send_from_directory, jsonify, Response, request
import json
import os

# the all-important app variable:
app = Flask(__name__)

@app.route("/index.html")
@app.route("/")
def splash_page():
	return render_template("index.html")

@app.route("/trucks.html")
@app.route("/trucks")
def truck_page():
	return render_template("trucks.html")

@app.route("/trucks/<name>")
def truck_details(name):
	return render_template("/trucks/%s" % name)

@app.route("/truckDetail.html")
@app.route("/truckDetail")
def truck_detail():
	return render_template("/trucks/truckDetail.html")


@app.route("/about")
@app.route("/about.html")
def about_page():
	return render_template("about.html")

@app.route("/parks")
@app.route("/parks.html")
def park_page():
	return render_template("parks.html")

@app.route("/parks/<name>")
def park(name):
	return render_template("/parks/%s" % name)

@app.route("/photos.html")
def photos:
	return render_template("photos.html")


if __name__ == "__main__":
	app.run(host='0.0.0.0', debug=True, port=80)
