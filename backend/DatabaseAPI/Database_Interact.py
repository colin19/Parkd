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
End connection
"""

cur = conn.cursor()

"""
Insert fields that need to be added
"""

#conn.commit()
cur.close()
conn.close()
