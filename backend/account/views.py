from flask_restx import Namespace , Resource , fields
from ..helpers.utils import db
from ..helpers.mails import MailService , TokenService
from http import HTTPStatus
from flask import request , Response
from ..models.account import User 
from flask_jwt_extended import get_jwt_identity, jwt_required 
from threading import Thread
from werkzeug.security import generate_password_hash , check_password_hash

accounts_namespace = Namespace('accounts', 'User account api endpoints namespace' ,path='/account') 


password_reset_mail_serializer = accounts_namespace.model(
   'User', {
      'email' : fields.String(required=True , description='An email address'),
   }
)

password_reset_confirm_serializer = accounts_namespace.model(
   'User', {
      'password1' : fields.String(required=True , description='New Password'),
      'password2' : fields.String(required=True , description='Confirm password'),
   }
)

password_change_serializer = accounts_namespace.model(
   'User', {
      'old_password' : fields.String(required=True , description='Current Password'),
      'password1' : fields.String(required=True , description='New Password'),
      'password2' : fields.String(required=True , description='Confirm password'),
   }
)

user_details_serializer = accounts_namespace.model(
    'User', {
      'uuid': fields.String(), 
      'first_name' : fields.String(required=True , description='First Name'),
      'last_name' : fields.String(required=True , description='Last Name'),
      'email' : fields.String(required=True , description='An email address'), 
      'created_at' : fields.DateTime()
   }
)


@accounts_namespace.route('')
class RetrieveDestroyUserApiView(Resource):

    @accounts_namespace.marshal_with(user_details_serializer)
    @accounts_namespace.doc(
        description='Get a user with a specific id',
        params={
            'user_id':'An ID of a user'
        }
    )
    @jwt_required(False)
    def get(self):
        user_email = get_jwt_identity()
        user = User.query.filter_by(email=user_email).first()
        if user is None :
            return {'success':False, 'detail': 'User does not exist'} , HTTPStatus.NOT_FOUND
        return user , HTTPStatus.OK


    @accounts_namespace.marshal_with(user_details_serializer)
    @accounts_namespace.doc(
        description='Update the data of user with a specific id. The endpoint required form data submission',
        params={
            'public_id':'The public_id of a user'
        }
    )
    @jwt_required(False)
    def put(self):
        user_email = get_jwt_identity()
        user = User.query.filter_by(email=user_email).first()
        if user is None :
            return {'success':False, 'detail': 'User does not exist'}, HTTPStatus.NOT_FOUND
        return user , HTTPStatus.OK


    @accounts_namespace.doc(
        description='Delete a user with a specific id',
        params={
            'user_id':'An ID of a user'
        }
    )
    @jwt_required(False)
    def delete(self):
        user_email = get_jwt_identity()
        user = User.query.filter_by(email=user_email).first()
        if user is None :
            return {'success': False , 'detail':'User does not exist'} , HTTPStatus.NOT_FOUND
        db.session.delete(user)
        try:
            db.session.commit()
        except:
            db.session.rollback()
        return  {'success': True , 'detail':'Account delete'} ,  HTTPStatus.NO_CONTENT 


@accounts_namespace.route('/password-change')
class ChangePasswordRequest(Resource):
 
    @accounts_namespace.expect(password_change_serializer)
    @accounts_namespace.doc(
        description='Change user password',
    )
    @jwt_required(False)
    def post(self):
        user_email = get_jwt_identity()
        user = User.query.filter_by(email=user_email).first()
        data = request.get_json()
        old_password = data.get('old_password', None)
        password1 = data.get('password1', None)
        password2 = data.get('password2' , None) 
        if password1 and password2 :
            if password1 == password2 :
                if user and check_password_hash(user.password_hash , old_password):
                    user.password_hash = generate_password_hash(password2)
                    user.save()
                    response = {'success':True, 'detail':'Password updated successfully'}
                    return response , HTTPStatus.OK
                response = {'success': False , 'detail':'Current password is not correct'}
                return response , HTTPStatus.BAD_REQUEST
        response = {'success': False , 'detail':'Passwords does not match'}
        return response , HTTPStatus.BAD_REQUEST



@accounts_namespace.route('/password-reset')
class ResetPasswordRequest(Resource):
 
    @accounts_namespace.expect(password_reset_mail_serializer)
    @accounts_namespace.doc(
        description='Request a password reset mail',
    )
    def post(self):
        data = request.get_json()
        email = data.get('email')
        user = User.query.filter_by(email=email).first()
        if user:
            token = TokenService.create_password_reset_token(user.id)
            public_id=user.uuid
            Thread(target=MailService.send_reset_mail, kwargs={
                    'email': user.email ,'token': token , 'public_id':public_id
                }).start()
        response = {
        'success':True,
        'detail':'Instruction to reset your password has been sent to the provided email' 
        }
        return  response , HTTPStatus.OK




@accounts_namespace.route('/password-reset/<token>/<public_id>/confirm')
class ResetPasswordRequestConfirm(Resource):

    @accounts_namespace.expect(password_reset_confirm_serializer) 
    @accounts_namespace.doc(
        description='Request a password reset mail',
    ) 
    def post(self, token ,public_id  ):
        data = request.get_json()
        password1 = data.get('password1', None)
        password2 = data.get('password2' , None) 
        if password1 and password2 :
            if password1 == password2 :
                if TokenService.validate_password_reset_token(token , public_id ) :
                    user = User.query.filter_by(uuid=public_id).first()
                    if user:
                        user.password_hash = generate_password_hash(password2)
                        user.save()
                        response = {'success':True, 'detail':'Password updated successfully'}
                        return response , HTTPStatus.OK
                response = {'success': False , 'detail':'Password reset link is invalid'}
                return response , HTTPStatus.BAD_REQUEST
        response = {'success': False , 'detail':'Passwords does not match'}
        return response , HTTPStatus.BAD_REQUEST

