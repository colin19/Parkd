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

    def check_park_0:
		cur.execute("select name_first, name_last from address")
		data = cur.fetchall()
		ASSERT(data[0] == "Zilker Metropolitan Park")

if __name__ == '__main__':
    main()