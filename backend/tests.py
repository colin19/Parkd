#!/usr/bin/env python3
#from unittest import main, TestCase
import json
import unittest
import scraper
import pymysql
import requests


"""
May have to update the imported files, or modify other aspects of the set up.
This is a skeleton of some potential tests, it is free to be modified.
Be sure to check the project rubric for any specific requirements.
"""

class ScraperTestCase(unittest.TestCase):

	def setUp(self):
		self.parsed = scraper.getParkData("Austin")
		#self.parsed = scraper.getData["Portland"]
		#self.parsed = scraper.getDate["Seattle"]

		self.parsedTrucks = scraper.getTruckData("Austin")

		self.conn = pymysql.connect(host='34.217.60.78',
								user='root',
								password='parkd',
								db='parkd_sqlalchemy',
								charset='utf8mb4',
								cursorclass=pymysql.cursors.DictCursor)
		self.cur = self.conn.cursor()
		

	"""
	For all of these, just check an arbitrary entry in the databae
	and compare it to the expected output.
	"""

	#These same functions are executed to extract trucks

	def test_park_id(self):
		#Check id of the park
		self.assertEqual(str(scraper.getPlace_ids(self.parsed)[0]), "ChIJT-TyHTq1RIYRrV8umxkqGGI")

	def test_park_name(self): #All of these should be similar and simple
		self.assertEqual(scraper.getParkNames(self.parsed)[0], "Zilker Metropolitan Park")

	def test_park_addresses(self):
		self.assertEqual(scraper.getAddresses(self.parsed)[0], "2100 Barton Springs Rd, Austin, TX 78704, USA") #Zilker

	def test_park_ratings(self):
		self.assertEqual(scraper.getRatings(self.parsed)[0], 4.7)

	def test_park_longs(self):
		#Mayfield Park and Nature Preserve
		self.assertEqual(scraper.getLongitudes(self.parsed)[3], 30.3129736)

	def test_park_lats(self):
		#Mayfield Park and Nature Preserve
		self.assertEqual(scraper.getLatitudes(self.parsed)[3], -97.77162000000001)
	
	def test_park_adds(self): #Checks teh addresses from our MySQL Database
		#Mansfield Dam Park in Austin
		self.assertEqual(scraper.getParkAddresses(self.cur)[18], "700 E Live Oak St, Austin, TX 78704, USA")

if __name__ == '__main__':
		unittest.main()


