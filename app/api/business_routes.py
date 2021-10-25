from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Business, Review
from colors import *

business_routes = Blueprint('business', __name__)

# Get Business By Business ID
@business_routes.route('/<int:id>', methods=["GET"])
def business(id):
    business = Business.query.get(id)
    print(CGREEN + "\n business: \n", business.to_dict(), "\n" + CEND)
    return business.to_dict()

# All Reviews by Business ID
@business_routes.route('/<int:id>/review', methods=["GET"])
def review_by_business(id):
    businessId = id
    print(CGREEN + "\n BUSINESSID: \n", businessId, "\n" + CEND)
    reviews = Review.query.filter(Review.businessId == businessId).all()
    print(CGREEN + "\n Reviews: \n", reviews, "\n" + CEND)
    return {'reviews': [review.to_dict() for review in reviews]}
