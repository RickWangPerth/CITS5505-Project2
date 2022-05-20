from app import db
from app import login
#from app import admin
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    adminkey_hash = db.Column(db.String(128))
    #adminkey = db.Column(db.String(128))

    def __repr__(self):
        return '<User {}>'.format(self.username)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def set_adminkey(self, adminkey):
        self.adminkey_hash = generate_password_hash(adminkey)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def check_adminkey(self, adminkey):
        return check_password_hash(self.adminkey_hash, adminkey)

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

class Rank(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    seconds = db.Column(db.Integer, index=True)
    moves = db.Column(db.Integer, index=True)
    timestamp = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return '[User:{}, Time:{}, Moves:{}]'.format(\
        self.user_id,\
        self.seconds,\
        self.moves)

    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user_name': str(User.query.get(self.user_id).username),
            'seconds': self.seconds,
            'moves': self.moves,
            "timestamp": str(self.timestamp)
        }
