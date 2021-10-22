from .db import db

class Business(db.Model):
    __tablename__ = "businesses"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(length=64), nullable=False)
    ownerId = db.Column(db.Integer(), db.ForeignKey("users.id"), nullable=False)
    address1 = db.Column(db.String(length=64), nullable=True)
    address2 = db.Column(db.String(length=64), nullable=True)
    address3 = db.Column(db.String(length=64), nullable=True)
    city = db.Column(db.String(length=64), nullable=False)
    state = db.Column(db.String(length=3), nullable=False)
    country = db.Column(db.String(length=2), nullable=False)
    zipcode = db.Column(db.String(length=12), nullable=False)
    lat = db.Column(db.Numeric(precision=9, scale=7), nullable=False)
    lng = db.Column(db.Numeric(precision=10, scale=7), nullable=False)
    phone = db.Column(db.String(length=32), nullable=True)
    price = db.Column(db.Integer(), nullable=False)

    user = db.relationship("User", back_populates="businesses")
    reviews = db.relationship("Review", back_populates="business")
    # images = db.relationship("Image", back_populates="business")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ownerId': self.ownerId,
            'address1': self.address1,
            'address2': self.address2,
            'address3': self.address3,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'zipcode': self.zipcode,
            'lat': float(self.lat),
            'lng': float(self.lng),
            'phone': self.phone,
            'price': self.price
        }
