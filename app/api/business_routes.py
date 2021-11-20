from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Business, Review, Image
from colors import *

business_routes = Blueprint('business', __name__)

# Get Business By Business ID
@business_routes.route('/<int:id>', methods=["GET"])
def business(id):
    business = Business.query.get(id)
    print(CGREEN + "\n business: \n", business.to_dict(), "\n" + CEND)
    return business.to_dict()

@business_routes.route('', methods=["GET"])
def get_all_businesses():
    businesses = Business.query.all()
    return {'businesses': [business.to_dict() for business in businesses]}

# All Reviews by Business ID
@business_routes.route('/<int:id>/review', methods=["GET"])
def review_by_business(id):
    businessId = id
    print(CGREEN + "\n BUSINESSID: \n", businessId, "\n" + CEND)
    # This line filters for reviews that match the businessId and the orders them by the updatedAt column in descending order
    reviews = Review.query.filter(Review.businessId == businessId).order_by(Review.updatedAt.desc())
    print(CGREEN + "\n Reviews: \n", reviews, "\n" + CEND)
    return {'reviews': [review.to_dict() for review in reviews]}

@business_routes.route('/<int:id>/images', methods=["GET"])
def get_all_images_business(id):
  images = Image.query.filter(Image.imageable_id == id, Image.imageable_type == "business").all()
  print(CGREEN + "\n Reviews \n", Review.query.filter(Review.businessId == id).all(), "\n" + CEND)
  # Review.query.filter(Review.businessId == id).all()

  # Image.imageable_id == , Image.imageable_type == "review"
  # images = Image.query.all()
  print(CGREEN + "\n image: \n", images, "\n" + CEND)
  return {'images': [image.to_dict() for image in images]}
