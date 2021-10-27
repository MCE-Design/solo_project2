from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.image_form import DeleteImage
from app.models import db, Image
from app.s3_helpers import (
  upload_file_to_s3, allowed_file, get_unique_filename)
from colors import *

image_routes = Blueprint('image', __name__)


# Get image By ID
@image_routes.route('/<int:id>', methods=["GET"])
def get_images(id):
  image = Image.query.get(id)
  print(CGREEN + "\n image: \n", image.to_dict(), "\n" + CEND)
  return image.to_dict()

# Get Images By User ID
@image_routes.route('/<int:id>', methods=["GET"])
def get_all_images_user(userId):
  image = Image.query.filter(Image.userId == userId).all()
  image = Image.query.all()
  print(CGREEN + "\n request: \n", request.form, "\n" + CEND)
  print(CGREEN + "\n image: \n", image, "\n" + CEND)
  return image

# # All Reviews by Business ID
# @business_routes.route('/<int:id>/review', methods=["GET"])
# def review_by_business(id):
#     businessId = id
#     print(CGREEN + "\n BUSINESSID: \n", businessId, "\n" + CEND)
#     reviews = Review.query.filter(Review.businessId == businessId).all()
#     print(CGREEN + "\n Reviews: \n", reviews, "\n" + CEND)
#     return {'reviews': [review.to_dict() for review in reviews]}

@image_routes.route("", methods=["POST"])
@login_required
def upload_image():
  if "image" not in request.files:
    return {"errors": "Image required"}, 400

  image = request.files["image"]
  print(CGREEN + "\n request: \n", request, "\n" + CEND)
  # imageable_type = request.imagable_type;

  if not allowed_file(image.filename):
    return {"errors": "File type not permitted"}, 400

  image.filename = get_unique_filename(image.filename)

  upload = upload_file_to_s3(image)

  if "url" not in upload: # Basically if it's missing the "url" key there was some kind of error
    return upload, 400

  print(CGREEN + "\n HIT \n", "\n" + CEND)
  url = upload["url"]

  new_image = Image(
    userId=current_user.id,                          # We'll use the current user as the one who uploaded the image
    imageable_id = request.form["imageable_id"],
    imageable_type = request.form["imageable_type"],
    imageUrl=url,
    imageCaption = request.form["imageCaption"]
  )
  db.session.add(new_image)
  db.session.commit()
  return {"url": url}

# Edit Image Caption
@image_routes.route("", methods=["PUT"])
@login_required
def edit_caption():

  # data = form.data
  db.session.add()
  db.session.commit()
  return

# Delete Image
@image_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_image(id):
  form = DeleteImage()
  data = form.data
  form['csrf_token'].data = request.cookies['csrf_token']

  image_to_delete = Image.query.filter(Image.id == data["id"]).first()
  db.session.delete(image_to_delete)
  db.session.commit()

  # images = Image.query.all()
  # return {"images": [image.to_dict() for image in images]}
  return
