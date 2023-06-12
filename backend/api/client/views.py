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
   @url_namespace.doc(description='Shortening url')     
   @url_namespace.marshal_with(url_model)   
   @jwt_required()  
   def post(self): 
      authenticated_user_email = get_jwt_identity() 
      auth_user = User.query.filter_by(email=authenticated_user_email).first()   
      if not auth_user:
         return {
            'message': 'Cannot find record of this user.'
         }, HTTPStatus.NOT_FOUND
      data = request.get_json()
      long_url = data.get('long_url')
      
      if URLProcessing.is_valid_url(long_url):
         title , description = URLProcessing.extract_url_data(long_url)
         _ , code , short_url = URLProcessing.short_url()
         url =  Url(
            long_url=long_url,
            short_url=short_url,
            title=title,
            description=description,
            url_code=code,
            user_id=auth_user.id
         )
         try:
            url.save()
         except:
            db.session.rollback()
            response = { 'message' : 'An error occurred'} 
            return response , HTTPStatus.INTERNAL_SERVER_ERROR 
         return url , HTTPStatus.OK  
      response = { 'message' : 'The url is not invalid' }
      return response , HTTPStatus.BAD_REQUEST  
   


@url_namespace.route('') 
class GetURLSApiView(Resource):
   
   @url_namespace.doc(description='Retrieve all urls') 
   @url_namespace.marshal_with(url_model)   
   @jwt_required()   
   def get(self):
      authenticated_user_email = get_jwt_identity()
      auth_user = User.query.filter_by(email=authenticated_user_email).first()  
      if not auth_user:
         return {
            'message': 'Cannot find record of this user.'
         }, HTTPStatus.NOT_FOUND
      urls = Url.query.filter_by(user_id=auth_user.id).all()  
      return urls , HTTPStatus.OK  
   

@url_namespace.route('/<id>') 
class GetURLSApiView(Resource):

   @url_namespace.doc(description='Delete url')  
   @jwt_required()   
   def delete(self, id ):
      
      authenticated_user_email = get_jwt_identity()
      auth_user = User.query.filter_by(email=authenticated_user_email).first()  
      if not auth_user:
         return {
            'message': 'Cannot find record of this user.'
         }, HTTPStatus.NOT_FOUND
      url = Url.query.filter_by(uuid=id).first()  
      try:
         url.delete() 
      except:
         db.session.rollback()
         response = { 'message' : 'An error occurred'} 
         return response , HTTPStatus.INTERNAL_SERVER_ERROR 
      response = { 'message' : 'Link deleted'} 
      return response , HTTPStatus.NO_CONTENT  


@url_namespace.route('/<url_code>/click') 
class URLClickApiView(Resource): 
   @url_namespace.doc(description='Shot url click count') 
   @url_namespace.marshal_with(url_model)   
   def get(self,url_code):
      print(url_code)
      url = Url.query.filter_by(url_code=url_code).first() 
      if not url:
         return {
            'message': 'Invalid url.'
         }, HTTPStatus.NOT_FOUND 
      url.clicks = url.clicks + 1
      try:
         url.save()
      except:
         pass
      return url , HTTPStatus.OK  

@url_namespace.route('/breakdown') 
class GetURLSBreakDownApiView(Resource):
   
   @url_namespace.doc(description='Retrieve all urls')    
   @jwt_required() 
   def get(self):
      authenticated_user_email = get_jwt_identity() 
      auth_user = User.query.filter_by(email=authenticated_user_email).first()   
      if not auth_user:
         return {
            'message': 'Cannot find record of this user.'
         }, HTTPStatus.NOT_FOUND
      response = {
         'totalUrls': Url.get_total_urls(auth_user.id),
         'totalClicks': Url.get_total_clicks(auth_user.id), 
      }

      return response , HTTPStatus.OK  
   

@url_namespace.route('/latest') 
class GetLatestURLSApiView(Resource):
   
   @url_namespace.doc(description='Retrieve all urls') 
   @url_namespace.marshal_list_with(url_model)       
   @jwt_required()  
   def get(self):
      authenticated_user_email = get_jwt_identity() 
      auth_user = User.query.filter_by(email=authenticated_user_email).first()   
      if not auth_user:
         return {
            'message': 'Cannot find record of this user.'
         }, HTTPStatus.NOT_FOUND

      urls = Url.query.filter_by(user_id=auth_user.id).order_by(Url.created_at.desc()).limit(5).all()  
      return urls , HTTPStatus.OK   


@url_namespace.route('/<url_uuid>/qrcode')
class GenerateURLQrCodeApiView(Resource):
   
   @url_namespace.doc(description='Download link qrcode')  
   def get(self , url_uuid ):
      url = Url.query.filter_by(url_code=url_uuid).first()
      qr = qrcode.QRCode(version=1, box_size=10, border=5)
      qr.add_data(url.long_url)
      qr.make(fit=True)
      qr_img = qr.make_image(fill='black', back_color='white')
      img_io = io.BytesIO()
      qr_img.save(img_io, 'PNG')
      img_io.seek(0)
      return send_file(
         img_io, mimetype='image/png', 
         as_attachment=True, 
         attachment_filename='qrcode.png'
      )



