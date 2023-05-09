from flask import Flask
from flask_restx import Api
from flask_caching import Cache
from flask_bcrypt import Bcrypt
from .config.config import config_dict
from .auth.views import auth_namespace
from .account.views import accounts_namespace
from .client.views import url_namespace
from .helpers.utils import db
from .models.url import  Url
from .models.account import  User , Token 
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

from flask_cors import CORS


def create_app(config=config_dict['dev']):

    app = Flask(__name__)
    CORS(app)
    app.config.from_object(config)

    db.init_app(app)
    cache = Cache(app, config={'CACHE_TYPE': 'simple'})

    jwt= JWTManager(app)
    migrate = Migrate(app , db )
    bcrypt = Bcrypt(app)
    api = Api( 
        app , version='1.0', 
        title='URL shortenerr API', 
        description='A simple  API', 
        license_url='olakay', 
        contact_email='programmerolakay@gmail.com', 
        contact_url='olanrewajukabiru.vercel.com' , 
        )
    
    api.add_namespace(auth_namespace , path='/auth')
    api.add_namespace(accounts_namespace , path='/account')  
    api.add_namespace(url_namespace , path='/urls') 

    @app.shell_context_processor
    def make_shell_context():
        return {
            'db':db,
            'User': User ,
            'Token': Token ,
            'Url': Url ,
        }

    return app