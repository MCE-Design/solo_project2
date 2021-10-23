from typing import NoReturn
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    avatar = db.Column(db.String(2000), nullable=True, default='https://i.imgur.com/RBkqFEg.jpg')
    username = db.Column(db.String(40), nullable=False, unique=True)
    fname = db.Column(db.String(40), nullable=False)
    lname = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    businesses = db.relationship(
      "Business",
      secondary="images",
      primaryjoin="foreign(Image.userId)==User.id",
      secondaryjoin="and_(Image.imageable_type=='business', foreign(Image.imageable_id)==Business.id)",
      backref=db.backref("userImage_Business", lazy="dynamic"),
      lazy="dynamic"
    )
    reviews = db.relationship(
      "Review",
      secondary="images",
      primaryjoin="foreign(Image.userId)==User.id",
      secondaryjoin="and_(Image.imageable_type=='review', foreign(Image.imageable_id)==Review.id)",
      backref=db.backref("userImage_Review", lazy="dynamic"),
      lazy="dynamic"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'avatar': self.avatar,
            'username': self.username,
            'fname': self.fname,
            'lname': self.lname,
            'email': self.email,
            'userImage_Business': [business.to_dict() for business in self.businesses],
            'userImage_Review': [review.to_dict() for review in self.reviews],
        }
