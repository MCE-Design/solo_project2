from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.image_form import DeleteImage, CaptionEdit
from app.models import db, Image, Review
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
  print(CGREEN + "\n REQUEST HIT \n", "\n" + CEND)
  if len(request.form["imageCaption"]) > 1000:
    return {"errors": ["Your caption should be under 1000 characters"]}, 400

  if "image" not in request.files:
    return {"errors": ["Image required"]}, 400

  image = request.files["image"]
  print(CGREEN + "\n CLEARED IMAGE: \n", "\n" + CEND)

  if not allowed_file(image.filename):
    return {"errors": ["File type not permitted"]}, 400

  image.filename = get_unique_filename(image.filename)

  upload = upload_file_to_s3(image)

  if "url" not in upload: # Basically if it's missing the "url" key there was some kind of error
    print(CGREEN + "\n upload error \n", upload,"\n" + CEND)
    return {"errors":["AWS Uploaded Failed"]}, 400

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
  form = CaptionEdit()
  data = form.data
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    image = Image.query.filter(Image.id == data["id"]).first()
    image.imageCaption = data["imageCaption"]

    db.session.commit()
    images = Image.query.filter(Image.userId == current_user.id, Image.imageable_type == "user").all()
    return {"images": [image.to_dict() for image in images]}
  else:
    return "Bad Comment Data"

# Edit Image Business and Review Caption
@image_routes.route("/edit_business", methods=["PUT"])
@login_required
def edit_business_and_review_caption():
  form = CaptionEdit()
  data = form.data
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    image = Image.query.filter(Image.id == data["id"]).first()
    image.imageCaption = data["imageCaption"]

    db.session.commit()
    print(CGREEN + "\n DATA\n", data, "\n" + CEND)
    print(CGREEN + "\n IMAGEABLE TYPE\n", data["imageable_type"], "\n" + CEND)
    print(CGREEN + "\n BUSINESS ID\n", data["businessId"], "\n" + CEND)
    images = Image.query.filter(Image.imageable_id == data["businessId"], Image.imageable_type == "business").all() + Image.query.join(Review, Image.imageable_id == Review.id).filter(Image.imageable_type == "review", Review.businessId == data["businessId"]).all()
    print(CGREEN + "\n BUSINESS OR REVIEW IMAGES \n", images, "\n" + CEND)
    return {"images": [image.to_dict() for image in images]}
  else:
    return "Bad Comment Data"

# Delete Image
@image_routes.route("", methods=["DELETE"])
@login_required
def delete_image():
  form = DeleteImage()
  data = form.data
  form['csrf_token'].data = request.cookies['csrf_token']

  image_to_delete = Image.query.filter(Image.id == data["id"]).first()
  db.session.delete(image_to_delete)
  db.session.commit()

  images = Image.query.all()
  print(CGREEN + "\n delete images \n", images, "\n" + CEND)
  return {"errors": ["Your photo has been removed. You can upload another below."]}

# Delete Business and Review Image
@image_routes.route("/deleteBusinessImage", methods=["DELETE"])
@login_required
def delete_business_and_review_image():
  form = DeleteImage()
  data = form.data
  form['csrf_token'].data = request.cookies['csrf_token']

  image_to_delete = Image.query.filter(Image.id == data["id"]).first()
  db.session.delete(image_to_delete)
  db.session.commit()
  print(CGREEN + "\n formData \n", data, "\n" + CEND)
  images = Image.query.filter(Image.imageable_id == data["businessId"], Image.imageable_type == "business").all() + Image.query.join(Review, Image.imageable_id == Review.id).filter(Image.imageable_type == "review", Review.businessId == data["businessId"]).all()
  print(CGREEN + "\n delete images \n", images, "\n" + CEND)
  return {"images": [image.to_dict() for image in images]}
