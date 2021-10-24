from .db import db


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer(), db.ForeignKey("users.id"), nullable=False)
    businessId = db.Column(db.Integer(), db.ForeignKey("businesses.id"), nullable=False)
    rating = db.Column(db.Integer(), nullable=False)
    review = db.Column(db.String(length=5000), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False)
    updatedAt = db.Column(db.DateTime(timezone=True), onupdate=db.func.now(), nullable=False)
    user = db.relationship("User", back_populates="reviews")
    business = db.relationship("Business", back_populates="reviews")
    # images = db.relationship("Image", back_populates="review")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'businessId': self.businessId,
            'rating': self.rating,
            'review': self.review,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
