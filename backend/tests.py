#!/usr/bin/env python3
from unittest import main, TestCase
from main import app
import json

"""
May have to update the imported files, or modify other aspects of the set up.
This is a skeleton of some potential tests, it is free to be modified.
Be sure to check the project rubric for any specific requirements.
"""

conn = pymysql.connect(host='parkd-mysql.cthwmo3nyii9.us-east-2.rds.amazonaws.com',
                             user='parkdteam',
                             password='foodtrucks',
                             db='parkd_sqlalchemy',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
cur = conn.cursor()

class TestModels (TestCase):

	"""
	For all of these, just check an arbitrary entry in the databae
	and compare it to the expected output.

	May need to update the arguments to be appropriate, this is just
	a skeleton
	"""

    def check_park_id(self):
    	#Check id of the park

	def check_park_name(self): #All of these should be similar and simple

	def check_park_addresses(self):

	def check_park_ratings(self):

	def check_park_longs(self):

	def check_park_lats(self):

	def check_truck_adds(self): #Checks teh addresses from our MySQL Database
		
	def check_park_adds(self): #Checks teh addresses from our MySQL Database

	def check_truck_id(self):
    	#Check id of the truck

	def check_truck_name(self):

	def check_truck_addresses(self):

	def check_truck_ratings(self):

	def check_truck_longs(self):

	def check_truck_lats(self):

	def check_getClosestTruck(self):

if __name__ == '__main__':
    main()