from .db import db


class Image(db.Model):
    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer(), db.ForeignKey("users.id"), nullable=False)
    businessId = db.Column(db.Integer(), db.ForeignKey("businesses.id"), nullable=True)
    reviewId = db.Column(db.Integer(), db.ForeignKey("reviews.id"), nullable=True)
    imageUrl = db.Column(db.String(1000))

    user = db.relationship("User", back_populates="images")
    business = db.relationship("Business", back_populates="images")
    review = db.relationship("Review", back_populates="images")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'businessId': self.businessId,
            'reviewId': self.reviewId,
            'imageUrl': self.imageUrl,
        }
