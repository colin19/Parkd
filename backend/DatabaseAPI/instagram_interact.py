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

#https://www.instagram.com/p/BgRaXe7j_vu/?tagged=themightycone
url = 'http://api.instagram.com/oembed?url=http://instagram.com/p/Hcz_wdC3PO/?tagged=themightycone'

response = requests.get(url)
data = response.text
parsed = json.loads(data)
media_id = parsed['media_id']


print("Media_id: " + media_id)


"""

"""

#conn.commit()
cur.close()
conn.close()
