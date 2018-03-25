#!/usr/bin/env python3
from unittest import main, TestCase
from main import app
import json

class TestModels (TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True


if __name__ == '__main__':
    main()