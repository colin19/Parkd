#!/usr/bin/env python
# coding=UTF-8

import json
import requests

city = 'portland'

url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=parks+in+' \
	+ city + '&key=AIzaSyAhABTKAw-LK6_Vh5Vhle7gwBebbpLCHew'

response = requests.get(url)

data = response.text

parsed = json.loads(data)
#print type(parsed)

#park_name = parsed["results"]
#print(park_name)

#print type(parsed["results"]) #HMMMM it's a list
addresses = []
park_names = []
place_ids = []
ratings = []

for i in parsed["results"]:
	addresses.append(i["formatted_address"])
	park_names.append(i["name"])
	place_ids.append(i["place_id"])
	ratings.append(i["rating"])

#print("Address: " + address)

for j in range(0,len(park_names)):
	print("name: " + park_names[j])
	print("address: " + addresses[j])
	print("ratings: " + str(ratings[j]))
	print("place_id: " + place_ids[j])
	print(" ")
	print(" ")
	ParkID = j + 20
	Name = park_names[j]
	City = city
	Address = addresses[j]
	Rating = ratings[j]
	PhotoID = 0
	GooglePlacesID = place_ids[j]

	






