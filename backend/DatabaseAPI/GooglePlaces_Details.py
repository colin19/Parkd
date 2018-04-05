import requests
import json as jsonlib
import csv
from time import sleep

'''
json is the "result" portion of a google places detail API response
keys is a single key, or a tuple of keys for multilevel cases such as json['opening_hours']['weekday_text']
a single key will be converted to a single item tuples
'''
def get_detail_for_place(json_response, keys):
	name = json_response["name"]
	
	if type(keys) is not tuple:
		keys = (keys, )
	
	detail = keys[0]
	
	try:
		for key in keys:
			json_response = json_response[key]
	except KeyError:
		return 'No ' + detail + ' found for place ' + name
		
	if type(json_response) is list:
		json_response = '\n'.join(json_response)
	
	return json_response
		
'''
Makes a google place detail request given a google place ID.
'''
def get_json_for_place(google_id):
	if type(google_id) is not str:
		google_id = str(google_id)
	
	url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + google_id + '&key=AIzaSyAKcRX11ISwO6rC3ebHGoWFt953wZ-3ZjU'
	
	response = requests.get(url)
	parsed = jsonlib.loads(response.text)
	
	code = parsed["status"]
	
	if code == 'OK':
		return parsed["result"]
	else:
		print(code)
		return -1

park_data = jsonlib.loads(open('Park.json').read())
		
with open('data_for_javier.csv', 'w+', newline='', ) as file:
	datawrite = csv.writer(file, delimiter=',')
	
	for park in park_data:
		id = park['google_id']
		response = get_json_for_place(id)
		
		sleep(0.1)
		
		if response == -1:
			continue
		hours = get_detail_for_place(response, ('opening_hours', 'weekday_text'))
		website = get_detail_for_place(response, 'website')
		
		datawrite.writerow([id, hours, website])
