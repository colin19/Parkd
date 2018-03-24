#!/usr/bin/env python
# coding=UTF-8

import json
import requests
import pymysql

"""
Start connection
"""

conn = pymysql.connect(host='parkd-mysql.cthwmo3nyii9.us-east-2.rds.amazonaws.com',
                             user='parkdteam',
                             password='foodtrucks',
                             db='parkd_database',
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

queryPlaceID = 'ChIJ5TnXj7O1RIYR1QQH8J_paW8'	#Adjusts for every city

url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' \
 + queryPlaceID + '&key=AIzaSyAqX77st4mh3Y3aSVSIReny2MVAQXTkjdc'

response = requests.get(url)

data = response.text

parsed = json.loads(data)
#print type(parsed)

#park_name = parsed["results"]
#print(park_name)

#print type(parsed["results"]) #HMMMM it's a list
reviews = []

#print(type(parsed["result"]["reviews"][0]))
print("Reviews: " + parsed["result"]["reviews"][0]["text"])

"""
for i in parsed["results"]:
	if("rating" in i):
		ratings.append(i["rating"]) #Has to be improved to handle case that rating is not present
	else:
		ratings.append("-1");
"""

#print("Address: " + address)

"""
for j in range(0,len(park_names)):
	park_names[j] = park_names[j].replace("'", "")
	print("index: " + str(j + 40))
	print("name: " + park_names[j])
	print("address: " + addresses[j])
	print("ratings: " + str(ratings[j]))
	print("place_id: " + place_ids[j])
	print("long: " + str(longitudes[j]))
	print("lat: " + str(latitudes[j]))

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
	longitude_ = longitudes[j]
	latitude_ = latitudes[j]
	
	#cur.execute("INSERT INTO park (ParkID, Name, City, Address, Rating, PhotoID, GooglePlacesID, longitude, latitude) VALUES ('%d', '%s', '%s', '%s', '%f', '0', '%s', %'s', '%s');" % (TruckID_, Name_, City_, Address_, Rating_, GooglePlacesID_, longitudes_, latitudes_))
	cur.execute("UPDATE `parkd_database`.`truck` SET `TruckID`='%s' WHERE `TruckID`='%d';" % (TruckID_, TruckID_))
	cur.execute("UPDATE `parkd_database`.`truck` SET `Name`='%s' WHERE `TruckID`='%d';" % (Name_, TruckID_))
	cur.execute("UPDATE `parkd_database`.`truck` SET `City`='%s' WHERE `TruckID`='%d';" % (City_, TruckID_))
	cur.execute("UPDATE `parkd_database`.`truck` SET `Address`='%s' WHERE `TruckID`='%d';" % (Address_, TruckID_))
	cur.execute("UPDATE `parkd_database`.`truck` SET `Rating`='%s' WHERE `TruckID`='%d';" % (Rating_, TruckID_))
	cur.execute("UPDATE `parkd_database`.`truck` SET `PhotoID`='%s' WHERE `TruckID`='%d';" % (0, TruckID_))
	cur.execute("UPDATE `parkd_database`.`truck` SET `GooglePlacesID`='%s' WHERE `TruckID`='%d';" % (GooglePlacesID_, TruckID_))

	cur.execute("UPDATE `parkd_database`.`truck` SET `longitude`='%s' WHERE `TruckID`='%d';" % (longitude_, TruckID_))
	cur.execute("UPDATE `parkd_database`.`truck` SET `latitude`='%s' WHERE `TruckID`='%d';" % (latitude_, TruckID_))
	if(TruckID_ == 60):
		print("AJFLKSJDKLFJSLKDJ HELLOOOOO")

	"""



#test
#cur.execute("INSERT INTO `parkd_database`.`truck` (`TruckID`, `Name`) VALUES ('40', 'helloo');")

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
