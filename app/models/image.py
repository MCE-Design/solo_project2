from .db import db
from sqlalchemy.dialects.postgresql import ENUM


class Image(db.Model):
    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    imageable_id = db.Column(db.Integer, nullable=False)
    imageable_type = db.Column(ENUM('business', 'review', name='imageable_types'), nullable=False)
    imageUrl = db.Column(db.String(1000))

    # user = db.relationship("User", back_populates="images")
    # business = db.relationship("Business", back_populates="images")
    # review = db.relationship("Review", back_populates="images")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'imageable_id': self.imageable_id,
            'imageable_type': self.imageable_type,
            'imageUrl': self.imageUrl
        }
