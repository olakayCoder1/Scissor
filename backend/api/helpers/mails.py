import ssl
import smtplib
import os
import json
import secrets
from email.message import EmailMessage
from datetime import datetime  
from functools import wraps
# from dotenv import load_dotenv
from flask import redirect , url_for
# from flask_login import current_user 
from api.helpers.utils import db
from api.models.account import  Token , User


secrets.token_hex()



# load_dotenv()

# def authenticated_not_allowed(func):
#     @wraps(func)
#     def decorated_view(*args, **kwargs):
#         if current_user.is_authenticated:
#             return redirect(url_for('posts_page'))
#         return func(*args, **kwargs)
#     return decorated_view



# Activation link
# Hello

# We are glad that you joined our website. We wish you a successful use of our 
# website and the best possible click-throughs and conversions for your links.

# To activate your account, click link below:


class DateTimeEncoder(json.JSONEncoder):
    def default(self,o):
        if isinstance(o , datetime):
            return o.isoformat()
        return json.JSONEncoder.default(self, o)

sender_email =  os.getenv('EMAIL_SENDER')  
password = os.getenv('EMAIL_PASSWORD') 


class MailService:

    def send_reset_mail(*args , **kwargs ):
        """
        Send two factor authentication code to hte email address in the kwargs
        
        """
        receiver = kwargs['email']
        token = kwargs['token']
        public_id = kwargs['public_id']
        receiver = kwargs['email']
        subject = "Password reset"
        body = f"""
                we receive a request to reset your password\n
                You can ignore if you don't make the request. Click the link below the to set new password.\n
                http://127.0.0.1:5000/password-reset/{token}/{public_id}/confirm
            """

        em = EmailMessage()
        em["From"] = sender_email
        em["To"] = receiver
        em["subject"] = subject
        em.set_content(body)
        context = ssl.create_default_context()
        try:
            with smtplib.SMTP_SSL("smtp.gmail.com", port=465, context=context) as connection:
                connection.login(sender_email, password)
                connection.sendmail(sender_email, receiver, em.as_string())
        except:
            pass
        return True

    def send_sign_two_factor_authentication_mail(*args , **kwargs   ):
        receiver = kwargs['email']
        code = kwargs['code']
        subject = "Login attempt"
        body = f"""
                we receive a request to sign in your account\n
                You can ignore if you don't make the request.\n
                CODE : {code}
            """

        em = EmailMessage()
        em["From"] = sender_email
        em["To"] = receiver
        em["subject"] = subject
        em.set_content(body)
        context = ssl.create_default_context()

        try:
            with smtplib.SMTP_SSL("smtp.gmail.com", port=465, context=context) as connection:
                connection.login(sender_email, password)
                connection.sendmail(sender_email, receiver, em.as_string())
        except:
            pass
        return True



class TokenService:

    def create_password_reset_token(user_id:int )-> str :
        """
        Generate a token for a user.
        :param user_id: The id of a user

        """
        reset_token = secrets.token_hex(20) + secrets.token_urlsafe(20)
        token = Token(user=user_id, token=reset_token , is_password=True)
        try:
           token.save()
        except:
            db.session.rollback()
            return None
        return reset_token


    def validate_password_reset_token(token:str , user_public_id):
        try:
            user = User.query.filter_by(public_id=user_public_id).first()
        except Exception as e :
            return False
        token_object = Token.query.filter_by(user=user.id, token=token , is_password=True).first()
        if token_object:
            current_time = datetime.now()
            time_diff_timedelta = current_time - token_object.created_at 
            hours = time_diff_timedelta.seconds > 3600
            if hours > 1 : 
                token_object.delete()
                return False
            token_object.delete()
            return True
        return False


