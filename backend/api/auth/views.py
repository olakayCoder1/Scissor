from flask_restx import Namespace , Resource 
from ..helpers.utils import db
from http import HTTPStatus
from flask import request , Response
from ..models.account import User
from .serializers import (
   USER_FIELDS_SERIALIZER, USER_REGISTRATION_FIELDS_SERIALIZER,
   LOGIN_FIELDS_SERIALIZER
)
from werkzeug.security import generate_password_hash , check_password_hash
from flask_jwt_extended import create_access_token , create_refresh_token, get_jwt_identity, jwt_required
import json 
from datetime import datetime 



class DateTimeEncoder(json.JSONEncoder):
    def default(self,o):
        if isinstance(o , datetime):
            return o.isoformat()
        return json.JSONEncoder.default(self, o)

auth_namespace = Namespace('auth', 'Authentication api endpoints namespace' ,path='/auth')

user_model = auth_namespace.model( 'User', USER_FIELDS_SERIALIZER )
login_model = auth_namespace.model( 'Login',LOGIN_FIELDS_SERIALIZER)
signup_model = auth_namespace.model( 'Signup', USER_REGISTRATION_FIELDS_SERIALIZER)



@auth_namespace.route('/signup')
class SignUpApiView(Resource):

   @auth_namespace.expect(signup_model)  
   # @auth_namespace.marshal_with(user_model , code=HTTPStatus.CREATED)     
   @auth_namespace.doc(description='Register an account' )
   def post(self):
      data = request.get_json()  
      email = data.get('email')
      password = data.get('password1')
      password2 = data.get('password2')
      if password != password2:
         response = {'message' : 'Passwords do not match'} 
         return response, HTTPStatus.BAD_REQUEST
      attempt_user = User.query.filter_by(email=email).first()
      if attempt_user :
         response = {'message' : 'Email already exist'} 
         return response, HTTPStatus.BAD_REQUEST  
         
      new_user  = User(
         email=email,  password_hash= generate_password_hash(password)
      )
      try:
         new_user.save()
      except:
         db.session.rollback()
         response = {'message' : 'An error occurred saving'} 
         return response, HTTPStatus.INTERNAL_SERVER_ERROR
      access_token = create_access_token(identity=new_user.email)
      refresh_token = create_refresh_token(identity=new_user.email)
      tokens = {
            'access_token' : access_token ,
            'refresh_token' : refresh_token
         }
      response = {
         'uuid': new_user.uuid,
         'email': new_user.email,
         'tokens': tokens
      }
      return response , HTTPStatus.CREATED 
      # return DateTimeEncoder(data) , HTTPStatus.CREATED 



@auth_namespace.route('/login')
class SignInApiView(Resource):

   @auth_namespace.expect(login_model)
   @auth_namespace.doc(description='Obtain tokens')
   def post(self):
      data = request.get_json()
      email = data.get('email')
      password = data.get('password')
      attempt_user = User.query.filter_by(email=email).first()
      if attempt_user and check_password_hash(attempt_user.password_hash , password):
         access_token = create_access_token(identity=attempt_user.email)
         refresh_token = create_refresh_token(identity=attempt_user.email)
         tokens = {
            'access_token' : access_token ,
            'refresh_token' : refresh_token
         }
         response = {
            'email': attempt_user.email,
            'tokens': tokens   
         }
         return response , HTTPStatus.OK 
      response = { 'message' : 'Invalid credentials'}
      return response , HTTPStatus.BAD_REQUEST


@auth_namespace.route('/refresh')
class RefreshToken(Resource):
   
   @jwt_required(refresh=True)
   def post(self):
      user_email = get_jwt_identity()
      access_token = create_access_token(user_email)
      return {'access_token' : access_token } , HTTPStatus.OK




