from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms import ReviewForm, ReviewEdit, DeleteReview
from app.models import db, Review
from colors import *

review_routes = Blueprint('review', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Reviews by Review ID
@review_routes.route('/<int:id>', methods=["GET"])
def review(id):
    review = Review.query.get(id)
    print(CGREEN + "\n review: \n", review.to_dict(), "\n" + CEND)
    return review.to_dict()

# New Review
@review_routes.route('', methods=["POST"])
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
        reviews = Review.query.filter(Review.businessId == data["businessId"]).order_by(Review.updatedAt.desc())
        return {"reviews": [review.to_dict() for review in reviews]}
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}


@review_routes.route('', methods=["PUT"])
def edit_review():
    print(CGREEN + "\n HIT THIS \n", "\n" + CEND)
    form = ReviewEdit()
    data = form.data
    print(CGREEN + "\n EDIT DATA: \n", data, "\n" + CEND)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edited_review = Review(
            userId=data["userId"],
            businessId=data["businessId"],
            rating=data["rating"],
            review=data["review"],
            updatedAt=db.func.now()
        )
        print(CGREEN + "\n data: \n", data, "\n" + CEND)
        db.session.add(edited_review)
        db.session.commit()
        reviews = Review.query.filter(Review.businessId == data["businessId"]).order_by(Review.updatedAt.desc())
        return {"reviews": [review.to_dict() for review in reviews]}
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}

@review_routes.route('', methods=["DELETE"])
def review_delete():
  form = DeleteReview()
  data = form.data
  form['csrf_token'].data = request.cookies['csrf_token']

  print(CGREEN + "\n DATA: \n", data, "\n" + CEND)
  review_to_delete = Review.query.filter(Review.id == data["id"]).first()
  db.session.delete(review_to_delete)
  db.session.commit()

  reviews = Review.query.filter(Review.businessId == data["businessId"]).order_by(Review.updatedAt.desc())
  print(CGREEN + "\n delete reviews \n", reviews, "\n" + CEND)
  return {"reviews": [review.to_dict() for review in reviews]}
