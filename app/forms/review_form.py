from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.core import IntegerField
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

def already_reviewed(form, field):
    # Checks to see if already reviewed
    userId = field.data
    businessId = form.data['businessId']
    review = Review.query.filter(Review.userId == userId, Review.businessId == businessId).first()
    print(CGREEN + "\n REVIEW \n", review, "\n" + CEND)
    if review is not None:
      raise ValidationError("You've already reviewed this.")


class ReviewForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired(), already_reviewed])
    businessId = IntegerField('businessId', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
    review = TextAreaField('review', validators=[DataRequired()])

class ReviewEdit(FlaskForm):
    id = IntegerField('id', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
    review = TextAreaField('review', validators=[DataRequired()])

class DeleteReview(FlaskForm):
    id = IntegerField("Id")
