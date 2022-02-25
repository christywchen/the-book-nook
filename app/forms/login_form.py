from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Optional
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Login credential is invalid.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    # if not user:
    #     break
    if user and not user.check_password(password):
        raise ValidationError('Password was incorrect.')

def data_req(form, field):
    if not field.data:
        raise ValidationError('Both fields must be filled out.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[data_req, Optional(), user_exists, Email()])
    password = StringField('password', validators=[
                           data_req, password_matches])
