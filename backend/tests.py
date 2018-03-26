#!/usr/bin/env python3
from unittest import main, TestCase
from main import app
import json


conn = pymysql.connect(host='parkd-mysql.cthwmo3nyii9.us-east-2.rds.amazonaws.com',
                             user='parkdteam',
                             password='foodtrucks',
                             db='parkd_sqlalchemy',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
cur = conn.cursor()

class TestModels (TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def check_park_0(self):
		cur.execute("SELECT name from park")
		data = cur.fetchall()
		assert data[0] == "Zilker Metropolitan Park"

	def check_park_count(self):
		cur.execute("SELECT count(*) from park")
		data = cur.fetchall()
		assert data[0] == 60

	def check_truck_0(self):
		cur.execute("SELECT name from truck")
		data = cur.fetchall()
		assert data[0] == "Veracruz All Natural Food Truck"

	def check_truck_photo_9(self):
		cur.execute("SELECT tag from truck")
		data = cur.fetchall()
		assert data[0] == "#themightycone"


if __name__ == '__main__':
    main()