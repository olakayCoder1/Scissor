from ..helpers.utils import db 
from datetime import datetime 
from uuid import uuid4 
from werkzeug.security import generate_password_hash , check_password_hash





class Url(db.Model):
    id = db.Column(db.Integer() , primary_key=True)
    clicks = db.Column(db.Integer() ,default=0)
    uuid = db.Column(db.String(length=60), nullable=False,  unique=True)
    name = db.Column( db.String(100) , nullable=True )
    title = db.Column( db.String(100) , nullable=True )
    description = db.Column( db.String(1000) , nullable=True )
    long_url = db.Column( db.String(1000) , nullable=False  )
    short_url =  db.Column( db.String(100) , nullable=False , unique=True )
    url_code = db.Column(db.String(64) , nullable=False  )
    qr_code = db.Column(db.String(64) , nullable=True )
    created_at = db.Column(db.DateTime() , nullable=False , default=datetime.utcnow)
    user_id = db.Column(db.Integer() , db.ForeignKey('user.id') , nullable=True)


    def save(self):
        if not self.uuid :
            self.uuid = uuid4().hex
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit() 

    @classmethod
    def get_total_clicks(cls, id):
        urls = Url.query.filter_by(user_id=id).all()
        total_clicks = sum([url.clicks for url in urls])
        return total_clicks
    @classmethod
    def get_total_urls(cls,id):
        return Url.query.filter_by(user_id=id).count() 

    @classmethod
    def check_url(cls , url):
        is_exist = cls.query.filter_by(short_url=url).first()
        return True if is_exist else False





