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

city = 'Austin'	#Adjusts for every city

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
longitudes = []
latitudes = []
reviews = []

index = 0 # HAs to be changed for each city
for i in parsed["results"]:
	addresses.append(i["formatted_address"])
	park_names.append(i["name"])
	place_ids.append(i["place_id"])
	if("rating" in i):
		ratings.append(i["rating"])
	else:
		ratings.append("-1");
	longitudes.append(i["geometry"]["location"]["lat"])
	latitudes.append(i["geometry"]["location"]["lng"])

	#Extract PlaceID info
	
	url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' \
 		+ i["place_id"] + '&key=AIzaSyAqX77st4mh3Y3aSVSIReny2MVAQXTkjdc'

 	response = requests.get(url)
	data = response.text
	parsed = json.loads(data)
	if("rating" in i):
		reviews_list = parsed["result"]["reviews"]
		count = 0
		for k in reviews_list:
			if(count < 3):
				cur.execute("UPDATE `parkd_sqlalchemy`.`park_review` SET `content`='%s' WHERE `id`='%d';" % (k["text"].replace("'", ""), (3 * index) + count))
				cur.execute("UPDATE `parkd_sqlalchemy`.`park_review` SET `park_id`='%d' WHERE `id`='%d';" % (index, (3 * index) + count))
		#cur.execute("INSERT INTO `parkd_sqlalchemy`.`park_review` (`id`, `content`, `truck_id`) VALUES ('%d', '%s', '%d');" % (index, i["place_id"], (3 * index) + k))
		#reviews.append(parsed["result"]["reviews"][k]["text"].replace("'", ""))
				count += 1
		while(count < 3):
			cur.execute("UPDATE `parkd_sqlalchemy`.`park_review` SET `content`='%s' WHERE `id`='%d';" % ("none", (3 * index + count)))
			cur.execute("UPDATE `parkd_sqlalchemy`.`park_review` SET `park_id`='%d' WHERE `id`='%d';" % (index, (3 * index) + count))
			count += 1
	else:
		cur.execute("UPDATE `parkd_sqlalchemy`.`park_review` SET `content`='%s' WHERE `id`='%d';" % ("none", (3 * index)))
		cur.execute("UPDATE `parkd_sqlalchemy`.`park_review` SET `content`='%s' WHERE `id`='%d';" % ("none", (3 * index) + 1))
		cur.execute("UPDATE `parkd_sqlalchemy`.`park_review` SET `content`='%s' WHERE `id`='%d';" % ("none", (3 * index) + 2))

		#reviews.append("-1")
		#reviews.append("-1")
		#reviews.append("-1")
		#break;
	index += 1

	#print("Reviews: " + reviews[3 * j])
	#print("Reviews: " + reviews[3 * j + 1])
	#print("Reviews: " + reviews[3 * j + 2])


conn.commit()
cur.close()
conn.close()
