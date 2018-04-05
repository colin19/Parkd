#!/usr/bin/env python
# coding=UTF-8

import json
import requests
import pymysql

def main():
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
	for i in range(1, 180):
		cur.execute("UPDATE `parkd_sqlalchemy`.`park_photo` SET" + 
			" `park_id`='%d' WHERE `id`='%d';" % (i / 3, i))
	#conn.commit()
	cur.close()
	conn.close()

if __name__ == "__main__":
	main()


