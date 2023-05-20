import random
import string

from api.models.url import Url
from flask import request 
from urllib.error import URLError, HTTPError 

import re

def is_valid_url(url):
    regex = re.compile(
        r'^(?:http|ftp)s?://'  # scheme
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'  # domain...
        r'localhost|'  # localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or IP
        r'(?::\d+)?'  # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    return bool(regex.match(url))






class URLProcessing:


    @classmethod
    def short_url(cls):
        characters = string.ascii_letters + string.digits
        random_string = ''.join(random.choices(characters, k=6))
        frontend_domain = 'http://127.0.0.1:5173/c/'
        new_url = f'{frontend_domain}{random_string}' 
        is_url_exist = Url.check_url(new_url)
        if is_url_exist: 
            URLProcessing.short_url() 
        print(new_url)
        return True , random_string , new_url
    

    @classmethod
    def is_valid_url(cls,url): 
        """"Check if a url is valid or not"""
        regex = re.compile(
            r'^(?:http|ftp)s?://'  # scheme
            r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'  # domain...
            r'localhost|'  # localhost...
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or IP
            r'(?::\d+)?'  # optional port
            r'(?:/?|[/?]\S+)$', re.IGNORECASE)
        return bool(regex.match(url)) 

    @classmethod
    def extract_url_data(cls,url): 
        from bs4 import BeautifulSoup
        import requests
        # Make a GET request to the URL
        response = requests.get(url)
        # Parse the HTML content of the page using BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')
        # Extract the title of the page
        try:
            title = soup.title.string
        except:
            title = ''

        # Extract the description of the page
        try:
            description = soup.find('meta', attrs={'name': 'description'})['content']
        except:
            description = '' 
        # print('Title:', title)
        # print('Description:', description) 
        return title , description

 