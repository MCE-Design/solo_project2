from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.core import IntegerField, SelectField
from wtforms.fields.simple import TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, Review
from colors import *


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email provided not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')

class ImageForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired()])
    businessId = IntegerField('businessId', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
    review = TextAreaField('review', validators=[DataRequired()])

class CaptionEdit(FlaskForm):
    id = IntegerField('id', validators=[DataRequired()])
    userId = IntegerField('userId', validators=[DataRequired()])
    imageable_id = IntegerField('imageable_id', validators=[DataRequired()])
    imageable_type = SelectField('imageable_types', choices=['user','business', 'review'], validators=[DataRequired()])
    imageUrl = TextAreaField('imageUrl', validators=[DataRequired()])
    imageCaption = TextAreaField('imageCaptioni', validators=[DataRequired()])

class DeleteReview(FlaskForm):
    id = IntegerField("Id")
