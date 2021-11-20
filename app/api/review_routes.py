from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms import ReviewForm, ReviewFormStandAlone, ReviewEdit, DeleteReview
from app.models import db, Review, Image
from app.s3_helpers import (
  upload_file_to_s3, allowed_file, get_unique_filename)
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
        return {"errors": validation_errors_to_error_messages(form.errors)}, 403

# New Review (Stand Alone)
@review_routes.route('/standalone', methods=["POST"])
@login_required
def add_review_standalone():
  form = ReviewFormStandAlone()
  data = form.data
  form['csrf_token'].data = request.cookies['csrf_token']

  if "image" in request.files:
    image = request.files["image"]
    if len(request.form["imageCaption"]) > 1000:
      return {"errors": ["Your caption should be under 1000 characters"]}, 400

    if not allowed_file(image.filename):
      return {"errors": ["File type not permitted"]}, 400

  if form.validate_on_submit():
    new_review = Review(
      userId=data["userId"],
      businessId=data["businessId"],
      rating=data["rating"],
      review=data["review"],
      createdAt=db.func.now(),
      updatedAt=db.func.now()
    )
    print(CGREEN + "\n StandAlone Data: \n", data, "\n" + CEND)
    db.session.add(new_review)
    db.session.commit()
    if "image" in request.files:
      upload = upload_file_to_s3(image)
      print(CGREEN + "\n Image In Req Files \n","\n" + CEND)
      print(CGREEN + "\n New Review ID: \n", new_review.id, "\n" + CEND)
      print(CGREEN + "\n imageable_type \n", request.form["imageable_type"],"\n" + CEND)
      print(CGREEN + "\n imageCaption \n", request.form["imageCaption"],"\n" + CEND)
      if "url" not in upload: # Basically if it's missing the "url" key there was some kind of error
        print(CGREEN + "\n upload error \n", upload,"\n" + CEND)
        return upload, 400

      print(CGREEN + "\n HIT \n", "\n" + CEND)
      url = upload["url"]

      new_image = Image(
        userId=current_user.id,                          # We'll use the current user as the one who uploaded the image
        imageable_id = new_review.id,
        imageable_type = request.form["imageable_type"],
        imageUrl=url,
        imageCaption = request.form["imageCaption"]
      )
      db.session.add(new_image)
      db.session.commit()
    reviews = Review.query.filter(Review.businessId == data["businessId"]).order_by(Review.updatedAt.desc())
    return {"reviews": [review.to_dict() for review in reviews]}
  else:
    return {"errors": validation_errors_to_error_messages(form.errors)}, 403


@review_routes.route('', methods=["PUT"])
def edit_review():
    print(CGREEN + "\n HIT THIS \n", "\n" + CEND)
    form = ReviewEdit()
    data = form.data
    print(CGREEN + "\n EDIT DATA: \n", data, "\n" + CEND)
    form['csrf_token'].data = request.cookies['csrf_token']
    edited_review = Review.query.filter(Review.id == data["id"]).first()
    if form.validate_on_submit():

        edited_review.userId = data["userId"]
        edited_review.businessId = data["businessId"]
        edited_review.rating = data["rating"]
        edited_review.review = data["review"]
        edited_review.updatedAt = db.func.now()

        print(CGREEN + "\n data: \n", data, "\n" + CEND)
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
