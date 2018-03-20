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
cur.execute("INSERT INTO park (ParkID, Name, City, GooglePlacesID) VALUES ('20', 'Glenhaven Park', 'Portland', 'ChIJ2XpRwUahlVQRuK6XjAFgm54');")

"""

print(cur.description)

print()

for row in cur:
    print(row)
    print()
    print("**************")
    print()

"""
conn.commit()
cur.close()
conn.close()