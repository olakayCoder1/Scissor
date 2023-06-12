from flask_restx import Namespace , Resource , fields







USER_FIELDS_SERIALIZER = {
      'uuid': fields.String(), 
      'email' : fields.String(required=True , description='An email address'), 
      'created_at' : fields.DateTime()
   }

USER_REGISTRATION_FIELDS_SERIALIZER = {
      'email' : fields.String(required=True , description='An email address'),
      'password' : fields.String(required=True , description='A password'),
   }

LOGIN_FIELDS_SERIALIZER =  {
      'email' : fields.String(required=True , description='User email address'),
      'password' : fields.String(required=True , description='User password'),
   }