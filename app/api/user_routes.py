from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms import UserEditForm
from app.models import User, Image, db
from colors import *

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('', methods=['PATCH'])
def userEdit():
    form = UserEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            lname=form.data['fname'],
            fname=form.data['lname'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Get All User Images By User ID
@user_routes.route('/<int:id>/images', methods=["GET"])
def get_all_images_user(id):
  images = Image.query.filter(Image.userId == id, Image.imageable_type == "user").all()
  # images = Image.query.all()
  print(CGREEN + "\n image: \n", images, "\n" + CEND)
  return {'images': [image.to_dict() for image in images]}
