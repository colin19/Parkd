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
                             db='parkd_sqlalchemy',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

"""
End connection
"""

cur = conn.cursor()

#cur.execute("SELECT * FROM Parks")

"""
Adding content
"""

origin = "austin texas" #Park address
destination = "el paso texas" #truck address

park_addresses = []
truck_addresses = []

for i in range(0, 60): 
	sql = "SELECT address FROM park WHERE id ='%d'"
	cur.execute(sql % i)
	for row in cur:
		park_addresses.append(row['address'].replace("&", "")) #park address

for j in range(0, 60):
	sql = "SELECT address FROM truck WHERE id ='%d'"
	cur.execute(sql % j)
	for row in cur:
		truck_addresses.append(row['address'].replace("&", "")) #park address

#print("First park: " + park_addresses[0])
#print("First truck: " + truck_addresses[0])

#Finding teh TRUCK closest to teh parks
for park_ids in range(40, 60):
	closestID = 0
	url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' \
 		+ park_addresses[park_ids] + '&destinations=' + truck_addresses[park_ids] + '&key=AIzaSyAqX77st4mh3Y3aSVSIReny2MVAQXTkjdc'

	response = requests.get(url)
	data = response.text
	parsed = json.loads(data)
	closest_distance = parsed["rows"][0]["elements"][0]["distance"]["value"]
	for truck_id in range(40, 60):
		url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' \
 		+ park_addresses[park_ids] + '&destinations=' + truck_addresses[truck_id] + '&key=AIzaSyAqX77st4mh3Y3aSVSIReny2MVAQXTkjdc'

		response = requests.get(url)
		data = response.text
		parsed = json.loads(data)
		current_distance = parsed["rows"][0]["elements"][0]["distance"]["value"]
		if(current_distance < closest_distance):
			closest_distance = current_distance
			closestID = truck_id
	print("The closest truck is truckid: " + str(closestID))
	cur.execute("UPDATE `parkd_sqlalchemy`.`truck` SET `park_id`='%d' WHERE `id`='%d';" % (closestID, park_ids)) #here id corresponds to truck



"""
		#print(row['address'])
		closestID = 0
		for j in range(0, 60): 
			sql = "SELECT id FROM truck WHERE id ='%d'"
			cur.execute(sql % j)
			for row_ in cur_:
				originID = row_['id']) #truck id
				sql = "SELECT address FROM truck WHERE id ='%d'"
				cur.execute(sql % originID)
				for destination in cur:

					#Compare destination and origin
					url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' \
 					+ origin + '&destinations=' + destination + '&key=AIzaSyAqX77st4mh3Y3aSVSIReny2MVAQXTkjdc'

					response = requests.get(url)
					data = response.text
					parsed = json.loads(data)
					currdistance = parsed["rows"][0]["elements"][0]["distance"]["value"]

					
				#GET TEH DISTANCE BOIII
				if (#currdistance < #closestID[DISTANCE]):
					closestID = j
		print("The closest truck to this park is truckID: " + closestID)

"""


"""

url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' \
 + origin + '&destinations=' + destination + '&key=AIzaSyAqX77st4mh3Y3aSVSIReny2MVAQXTkjdc'

response = requests.get(url)

data = response.text

parsed = json.loads(data)
#print type(parsed)

#park_name = parsed["results"]
#print(park_name)

#print type(parsed["results"]) #HMMMM it's a list


print("Origin: " + origin)
print("Destination: " + destination)
print(parsed["rows"][0]["elements"][0]["distance"]["value"])

"""

conn.commit()
cur.close()
conn.close()
