from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms import ReviewForm, DeleteReview
from app.models import db, Review
from colors import *

review_routes = Blueprint('review', __name__)


# Reviews by Review ID
@review_routes.route('/<int:id>', methods=["GET"])
def review(id):
    review = Review.query.get(id)
    print(CGREEN + "\n review: \n", review.to_dict(), "\n" + CEND)
    return review.to_dict()

# New Review
@review_routes.route('/', methods=["POST"])
def add_review():
    form = ReviewForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_review = Review(
            userId=data["userId"],
            businessId=data["businessId"],
            rating=data["rating"],
            review=data["review"],
            createdAt=db.func.now(),
            updatedAt=db.func.now()
        )
        print(CGREEN + "\n data: \n", data, "\n" + CEND)
        db.session.add(new_review)
        db.session.commit()
        reviews = Review.query.filter(Review.businessId == data["businessId"]).all()
        return {"reviews": [review.to_dict() for review in reviews]}
    else:
        return "Bad Data"


# @review_routes.route('/<int:id>', methods=["PUT"])
# def review_edit(id):

@review_routes.route('/<int:id>', methods=["DELETE"])
def review_delete(id):
  form = DeleteReview()
  data = form.data
  form['csrf_token'].data = request.cookies['csrf_token']

  print(CGREEN + "\n DATA: \n", data, "\n" + CEND)
  review_to_delete = Review.query.filter(Review.id == data["reviewId"]).first()
  db.session.delete(review_to_delete)
  db.session.commit()
