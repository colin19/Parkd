import requests
import json
	
	
'''
json is the "result" portion of a google places detail API response
keys is a single key, or a tuple of keys for multilevel cases such as json['opening_hours']['weekday_text']
a single key will be converted to a single item tuples
'''
def get_detail_for_place(json, keys):
	name = json["name"]
	
	def get_detail(key):
		try:
			return json[key]
		except KeyError:
			return 'No ' + key + ' found for place: ' + name

	if type(keys) is not tuple:
		keys = (keys,)
	
	for key in keys:
		json = get_detail(key)
		
	if type(json) is list:
		print('adfafd')
		json = '\n'.join(json)
	
	return json
		
def get_json_for_place(google_id):
	if type(google_id) is not str:
		google_id = str(google_id)
	
	url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + google_id + '&key=AIzaSyAhABTKAw-LK6_Vh5Vhle7gwBebbpLCHew'
	response = requests.get(url)
	parsed = json.loads(response.text)
	
	code = parsed["status"]
	
	if code == 'OK':
		return parsed["result"]
	else:
		return code

		
park_data = json.loads(open('Park.json').read())
json = get_json_for_place(park_data[0]['google_id'])

print(get_detail_for_place(json, 'website'))
