from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class UserEditForm(FlaskForm):
    fname = StringField('fname', validators=[DataRequired()])
    lname = StringField('lname', validators=[DataRequired()])
    nickname = StringField('nickname', validators=[])
    headline = StringField('headline', validators=[])
    findme = StringField('findme', validators=[])


    # email = StringField('email', validators=[DataRequired()])
