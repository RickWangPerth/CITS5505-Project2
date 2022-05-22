from app import db
from app import login

from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func

from app import admin
from flask_admin.contrib.sqla import ModelView
from flask_admin.menu import MenuLink
from flask import url_for
from flask_login import current_user


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    adminkey = db.Column(db.String(128))
    ranks = db.relationship('Rank', backref='user', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def set_adminkey(self, adminkey):
        self.adminkey = adminkey

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


class Rank(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    seconds = db.Column(db.Integer, index=True)
    moves = db.Column(db.Integer, index=True)
    timestamp = db.Column(db.DateTime(timezone=True),
                          server_default=func.now())

    def __repr__(self):
        return '[User:{}, Time:{}, Moves:{}, timestamp:{}]'.format(
            self.user_id,
            self.seconds,
            self.moves,
            self.timestamp)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user_name': str(User.query.get(self.user_id).username),
            'seconds': self.seconds,
            'moves': self.moves,
            "timestamp": str(self.timestamp)
        }


class GamePool(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    numbase_array = db.Column(db.String(64))
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())

# Flask admin view customise


class RankView(ModelView):
    column_list = ('id', 'user_id', 'seconds', 'moves', 'timestamp')

    def is_accessible(self):
        return current_user.adminkey == 'adminkey'


class UserView(ModelView):
    column_list = ('id', 'username', 'email', 'adminkey')

    def is_accessible(self):
        return current_user.adminkey == 'adminkey'


class GamePoolView(ModelView):
    column_list = ('id', 'numbase_array', 'created_at')

    def is_accessible(self):
        return current_user.adminkey == 'adminkey'


admin.add_view(UserView(User, db.session))
admin.add_view(RankView(Rank, db.session))
admin.add_view(GamePoolView(GamePool, db.session))

# Falsk admin menulink modify


class MainIndexLink(MenuLink):
    def get_url(self):
        return url_for("index")


admin.add_link(MainIndexLink(name="Public Website"))
