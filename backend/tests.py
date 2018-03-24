#!/usr/bin/env python3
from unittest import main, TestCase
from main import app
import json

class TestModels (TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    ############################
    # Basic Site Functionality #
    ############################

    def test_site_home(self):
        r = self.app.get('/')
        self.assertEqual(r.status_code, 200)


    def test_site_about(self):
        r = self.app.get('/about')
        self.assertEqual(r.status_code, 200)

if __name__ == '__main__':
    main()