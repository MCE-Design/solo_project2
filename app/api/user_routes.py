from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Image
from colors import *

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# @user_routes.route('/<ind:id>', methods=["PATCH"])
# def user(id):
#   user = User.query.get(id)
#   return user.to_dict()

# Get All User Images By User ID
@user_routes.route('/<int:id>/images', methods=["GET"])
def get_all_images_user(id):
  images = Image.query.filter(Image.userId == id, Image.imageable_type == "user").all()
  # images = Image.query.all()
  print(CGREEN + "\n image: \n", images, "\n" + CEND)
  return {'images': [image.to_dict() for image in images]}
