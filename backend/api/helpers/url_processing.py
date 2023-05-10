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
        new_url = f'https://{request.host}/{random_string}'
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
 