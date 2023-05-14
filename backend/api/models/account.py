from ..helpers.utils import db 
from datetime import datetime 
from uuid import uuid4 





class User(db.Model):
    id = db.Column(db.Integer() , primary_key=True)
    uuid = db.Column(db.String(length=60), nullable=False,  unique=True)
    email =  db.Column( db.String(100) , nullable=False , unique=True )
    password_hash = db.Column(db.String(64) , nullable=False )
    created_at = db.Column(db.DateTime() , nullable=False , default=datetime.utcnow)
    transaction = db.relationship('Url' , backref='url_user' , lazy=True )
    token = db.relationship('Token' , backref='token_user' , lazy=True )


    def save(self):
        self.uuid = uuid4().hex
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()








class Token(db.Model):
    id = db.Column(db.Integer() , primary_key=True)
    uuid = db.Column(db.String(length=60), nullable=False,  unique=True)
    user_id =  db.Column(db.Integer(), db.ForeignKey('user.id'))
    token = db.Column(db.Text(), nullable=False)
    token_type = db.Column(db.String(length=20), nullable=False)
    created_at = db.Column(db.DateTime() , nullable=False , default=datetime.utcnow)


    def save(self):
        self.uuid = uuid4().hex
        db.session.add(self)
        db.session.commit()


    def delete(self):
        db.session.delete(self)
        db.session.commit()


