from flask_restx import Namespace , Resource 
from ..helpers.utils import db
from http import HTTPStatus
from flask import request , Response , redirect
from api.models.url import Url
import json 
from datetime import datetime 






visitor_namespace = Namespace('visitor', 'Visitor api endpoints namespace' ,path='/c')


@visitor_namespace.route('/<url_id>')
class GenerateURLApiView(Resource):
   
    @visitor_namespace.doc(description='Shortening url')     
    def get(self, url_id): 
        url = Url.query.filter_by(short_url=url_id).first()
        if url:
            return redirect(url.long_url, code=302)
        return {'message': 'Not found'} , HTTPStatus.NOT_FOUND