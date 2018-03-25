import unittest
import flask

from flask_testing import LiveServerTestCase
from selenium import webdriver

class FirefoxTestCase(LiveServerTestCase):

    def create_app(self):
        app = flask.Flask(__name__)
        app.config['TESTING'] = True
        # Default port is 5000
        app.config['LIVESERVER_PORT'] = 8943
        # Default timeout is 5 seconds
        app.config['LIVESERVER_TIMEOUT'] = 10
        return app

    def setUp(self):
        self.driver = webdriver.Firefox()
    
    def test_site_navigation(self):
        driver = self.driver
        self.assertIn("Parkd.US", driver.title)
        
        driver.find_element_by_link_text("About").click()
        self.assertEqual("About us", driver.find_element_by_tag_name('h1').text)
        
        driver.find_element_by_link_text("Photos").click()
        self.assertEqual("Photos on Social Media", driver.find_element_by_tag_name('h1').text)
        
        driver.find_element_by_link_text("Trucks").click()
        self.assertEqual("Explore Food Trucks Around You", driver.find_element_by_tag_name('h1').text)
        
        driver.find_element_by_link_text("Parks").click()
        self.assertEqual("Explore Parks Around You", driver.find_element_by_tag_name('h1').text)
        
    def test_browser_controls(self):
        driver = self.driver
        driver.find_element_by_link_text('About').click()
        driver.find_element_by_link_text('Photos').click()
        driver.find_element_by_link_text('Trucks').click()
        driver.find_element_by_link_text('Parks').click()
        driver.back()
        driver.forward()
        driver.back()
        driver.back()
        driver.forward()
        driver.forward()
        driver.back()
        driver.back()
        self.assertEqual("About us", driver.find_element_by_tag_name('h1').text)

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":  # pragma: no cover
    unittest.main()
