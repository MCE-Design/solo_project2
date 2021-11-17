from operator import imod
from flask_wtf import FlaskForm
from wtforms import StringField
import wtforms
from wtforms.fields.core import IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class UserEditForm(FlaskForm):
    id = IntegerField('id', validators=[DataRequired()])
    fname = StringField('fname', validators=[DataRequired()])
    lname = StringField('lname', validators=[DataRequired()])
    nickname = StringField('nickname', validators=[])
    headline = StringField('headline', validators=[])
    findme = StringField('findme', validators=[])


    # email = StringField('email', validators=[DataRequired()])
