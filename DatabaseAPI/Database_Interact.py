#!/usr/bin/env python
# coding=UTF-8

import json
import requests
import pymysql

"""
Start connection stuff
"""

conn = pymysql.connect(host='parkd-mysql.cthwmo3nyii9.us-east-2.rds.amazonaws.com',
                             user='parkdteam',
                             password='foodtrucks',
                             db='parkd_database',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

"""
End connection stuff
"""

cur = conn.cursor()

#cur.execute("SELECT * FROM Parks")

"""
Adding the stuff
"""

city = 'Seattle'	#Adjusts for every city

url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=Food+Trucks+in+' \
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
	ratings.append(i["rating"]) #Has to be improved to handle case that rating is not present

#print("Address: " + address)

for j in range(0,len(park_names)):
	park_names[j] = park_names[j].replace("'", "")
	print("name: " + park_names[j])
	print("address: " + addresses[j])
	print("ratings: " + str(ratings[j]))
	print("place_id: " + place_ids[j])
	print(" ")
	print("***** AYYE LMAO I'M A LEGEND ******")
	print(" ")
	TruckID_ = j + 40	#Have to change this every time
	Name_ = park_names[j]
	City_ = city
	Address_ = addresses[j]
	Rating_ = ratings[j]
	PhotoID_ = 0
	GooglePlacesID_ = place_ids[j]
	cur.execute("INSERT INTO truck (TruckID, Name, City, Address, Rating, PhotoID, GooglePlacesID) VALUES ('%d', '%s', '%s', '%s', '%f', '0', '%s');" % (TruckID_, Name_, City_, Address_, Rating_, GooglePlacesID_))

"""

print(cur.description)

print()

for row in cur:
    print(row)
    print()
    print("**************")
    print()

"""
#conn.commit()
cur.close()
conn.close()