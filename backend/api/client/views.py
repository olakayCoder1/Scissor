import qrcode
import qrcode
import io
from http import HTTPStatus
from flask_restx import Namespace , Resource 
from flask import request , Response, send_file
from flask_jwt_extended import ( jwt_required , get_jwt_identity )
from .serializers import URL_CREATE_FIELD_SERIALIZER , URL_FIELDS_SERIALIZER
from ..helpers.utils import db
from api.helpers.url_processing import URLProcessing
from api.models.account import User
from api.models.url import Url
from api.auth.views import DateTimeEncoder


url_namespace = Namespace('urls', 'Url operations api endpoints namespace' , path='/urls') 

url_create_model = url_namespace.model( 'Url  Serializer', URL_CREATE_FIELD_SERIALIZER )
url_model = url_namespace.model( 'Url', URL_FIELDS_SERIALIZER )


@url_namespace.route('/create')
class GenerateURLApiView(Resource):
   
   @url_namespace.expect(url_create_model)
   @url_namespace.expect(url_model) 
   @url_namespace.doc(description='Shortening url')     
   def post(self): 
      data = request.get_json()
      long_url = data.get('long_url')
      if URLProcessing.is_valid_url(long_url):
         _ , code , short_url = URLProcessing.short_url()
         url =  Url(
            long_url=long_url,
            short_url=short_url,
            
         )
         try:
            url.save()
         except:
            db.session.rollback()
            response = { 'message' : 'An error occurred'} 
            return response , HTTPStatus.INTERNAL_SERVER_ERROR 
         
         response = { 
            'uuid' : url.uuid,
            'shortUrl' : url.short_url,
            'longUrl' : url.long_url,
         }
         return response , HTTPStatus.OK  
      response = { 'message' : 'The url is not invalid' }
      return response , HTTPStatus.BAD_GATEWAY 
   


@url_namespace.route('/<url_uuid>/qrcode')
class GenerateURLQrCodeApiView(Resource):
   
   @url_namespace.doc(description='Shortening url') 
   @jwt_required()    
   def get(self , url_uuid ):
      img = qrcode.make(url_uuid)
      img_io = io.BytesIO()
      img.save(img_io, 'PNG')
      img_io.seek(0)
      return send_file(
         img_io, mimetype='image/png', 
         as_attachment=True, 
         attachment_filename='qrcode.png'
      )


@url_namespace.route('/<url_uuid>/qrcode')
class GenerateURLQrCodeApiView(Resource):
   
   @url_namespace.doc(description='Get Analytics') 
   @jwt_required()    
   def get(self , url_uuid ):
      authenticated_user_email = get_jwt_identity() 
      auth_user = User.query.filter_by(email=authenticated_user_email).first()   
      if not auth_user:
         return {
            'message': 'Cannot find record of this user.'
         }, HTTPStatus.NOT_FOUND

      url = Url.query.filter_by(user_id=auth_user.id).all()
      img = qrcode.make(url_uuid)
      img_io = io.BytesIO()
      img.save(img_io, 'PNG')
      img_io.seek(0)
      return send_file(
         img_io, mimetype='image/png', 
         as_attachment=True, 
         attachment_filename='qrcode.png'
      )



