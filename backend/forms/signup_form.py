from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo
from backend.models import User


def name_length(form, field):
    # Check that field length is not more than 40 characters
    text = field.data

    if len(text) > 40:
        raise ValidationError('Username, first name, and last name each cannot be more than 40 characters.')


def email_length(form, field):
    # Check that email length is not more than 255 characters
    email = field.data

    if len(email) > 255:
        raise ValidationError('Email cannot be more than 255 characters.')


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def email_exists(form, field):
    # Checking if username is already in use
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, name_length])
    # first_name = StringField('first_name', validators=[DataRequired(), name_length])
    # last_name = StringField('last_name', validators=[DataRequired(), name_length])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), EqualTo('confirm_password', message='Passwords must match')])
    confirm_password = StringField('confirm_password', validators=[DataRequired()])
