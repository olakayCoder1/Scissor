from flask_restx import Namespace , Resource , fields







URL_CREATE_FIELD_SERIALIZER = {
      'long_url' : fields.String(required=True , description='Long url'),
   }


URL_FIELDS_SERIALIZER = {
      'uuid' : fields.String(required=True , description='ID'),
      'long_url' : fields.String(required=True , description='Long url'),
      'short_url' : fields.String(required=True , description='Short url'),
      'name' : fields.String(required=True , description='Short url name'),
      'title' : fields.String(required=True , description='Long url title'),
      'description' : fields.String(required=True , description='Long url description'),
      'url_code' : fields.String(required=True , description='Url code'),
      'clicks' : fields.Integer(required=True , description='Number of clicks'),
      'created_at' : fields.DateTime()
   }
