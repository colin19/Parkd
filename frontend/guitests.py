import unittest, time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

class FirefoxTestCase(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(10)
        self.driver.get("http://localhost:3000")
    
    def test_site_navigation(self):
        driver = self.driver
        assert "Parkd.US" in driver.title
        
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
        driver.back()
        self.assertEqual("About us", driver.find_element_by_tag_name('h1').text)

    def test_about_page(self): # not really much to test here
        driver = self.driver
        driver.find_element_by_link_text('About').click()
        self.assertEqual("About us", driver.find_element_by_tag_name('h1').text)
        names = driver.find_elements_by_xpath("//div[@class='card-body']/div/h3")
        self.assertEqual("Gijs Landwehr", names[0].text)
        self.assertEqual("Austen Castberg", names[1].text)
        self.assertEqual("Colin Hall", names[2].text)
        self.assertEqual("Javier Banda", names[3].text)
        self.assertEqual("Diego Alcoz", names[4].text)
        self.assertEqual("Lin Guan", names[5].text)

    def test_photos_basic_match(self):
        driver = self.driver
        driver.find_element_by_link_text('Photos').click()
        assert "Photos" in driver.find_element_by_tag_name('h1').text
        try:
            element = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "card"))
            )
            photo_card = driver.find_element_by_class_name('card')
            photo_tag = photo_card.find_element_by_css_selector(".photoCardTitle .photoCardTitle").text
            photo_card.find_element_by_tag_name("button").click()
            assert driver.find_element_by_css_selector(".photo-tag-info h1").text == photo_tag
        finally:
            pass

    def test_photos_filtering(self):
        driver = self.driver
        driver.find_element_by_link_text('Photos').click()
        assert "Photos" in driver.find_element_by_tag_name('h1').text
        time.sleep(2)
        filters = driver.find_elements_by_class_name('Select')
        filters[0].click()
        filters[0].find_element_by_tag_name('input').send_keys("Austin" + Keys.RETURN)
        filters[1].click()
        filters[1].find_element_by_css_selector('.Select-option[id*="-option-6"]').click()
        filters[2].click()
        filters[2].find_element_by_css_selector('.Select-option[id*="-option-0"]').click()
        filters[3].click()
        filters[3].find_element_by_tag_name('input').send_keys("rabbit" + Keys.RETURN)
        driver.find_element_by_css_selector('.search-bar button').click()
        time.sleep(2)
        cards = driver.find_elements_by_css_selector(".photoCardTitle .photoCardTitle")
        assert len(cards) == 7
        assert cards[0].text == "# lukesinsideout"

    def test_trucks_basic_match(self):
        driver = self.driver
        driver.find_element_by_link_text('Trucks').click()
        assert "Trucks" in driver.find_element_by_tag_name('h1').text
        truck_card = driver.find_element_by_class_name('card')
        truck_tag = truck_card.find_element_by_css_selector(".photoCardTitle .photoCardTitle").text
        truck_card.find_element_by_tag_name("button").click()
        assert driver.find_element_by_css_selector(".intro h1").text == truck_tag

    def test_trucks_filtering(self):
        driver = self.driver
        driver.find_element_by_link_text('Trucks').click()
        assert "Trucks" in driver.find_element_by_tag_name('h1').text
        filters = driver.find_elements_by_class_name('Select')
        filters[0].click()
        filters[0].find_element_by_tag_name('input').send_keys("Austin" + Keys.RETURN)
        filters[1].click()
        filters[1].find_element_by_css_selector('.Select-option[id*="-option-6"]').click()
        filters[2].click()
        filters[2].find_element_by_css_selector('.Select-option[id*="-option-0"]').click()
        filters[3].click()
        filters[3].find_element_by_css_selector('.Select-option[id*="-option-1"]').click()
        filters[4].click()
        filters[4].find_element_by_tag_name('input').send_keys("street" + Keys.RETURN)
        driver.find_element_by_css_selector('.search-bar button').click()
        title_parts = driver.find_elements_by_css_selector(".photoCardTitle .photoCardTitle")
        assert len(title_parts) == 3
        assert "DEE DEE - Northern Thai" == title_parts[0].text
        assert "Street" == title_parts[1].text
        assert "Food" == title_parts[2].text

    def test_parks_basic_match(self):
        driver = self.driver
        driver.find_element_by_link_text('Parks').click()
        assert "Parks" in driver.find_element_by_tag_name('h1').text
        truck_card = driver.find_element_by_class_name('card')
        truck_tag = truck_card.find_element_by_css_selector(".photoCardTitle .photoCardTitle").text
        truck_card.find_element_by_tag_name("button").click()
        assert driver.find_element_by_css_selector(".intro h1").text == truck_tag

    def test_parks_filtering(self):
        driver = self.driver
        driver.find_element_by_link_text('Parks').click()
        assert "Parks" in driver.find_element_by_tag_name('h1').text
        filters = driver.find_elements_by_class_name('Select')
        filters[0].click()
        filters[0].find_element_by_tag_name('input').send_keys("Austin" + Keys.RETURN)
        filters[1].click()
        filters[1].find_element_by_css_selector('.Select-option[id*="-option-1"]').click()
        filters[2].click()
        filters[2].find_element_by_css_selector('.Select-option[id*="-option-1"]').click()
        filters[3].click()
        filters[3].find_element_by_tag_name('input').send_keys("creek" + Keys.RETURN)
        driver.find_element_by_css_selector('.search-bar button').click()
        title_parts = driver.find_elements_by_css_selector(".photoCardTitle .photoCardTitle")
        assert len(title_parts) == 3
        assert "Barton" == title_parts[0].text
        assert "Creek" == title_parts[1].text
        assert "Greenbelt" == title_parts[2].text

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":  # pragma: no cover
    unittest.main()
