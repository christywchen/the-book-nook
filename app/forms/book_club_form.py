from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, TextAreaField, IntegerField, ValidationError
from wtforms.validators import DataRequired, Optional

def name_length(form, field):
    # Check that name is not more than 40 characters
    name = field.data

    if len(name) > 40:
        raise ValidationError('Name should be 40 characters or less.')


def description_length(form, field):
    # Check that description is not more than 100 characters
    description = field.data

    if len(description) > 100:
        raise ValidationError('Description should be 100 characters or less.')


def minimum_capacity(form, field):
    # Check that capacity is more than 0
    capacity = field.data

    if capacity <= 0:
        raise ValidationError('Member capacity must be at least 1.')


class BookClubForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), name_length])
    description = TextAreaField('description', validators=[Optional(), description_length])
    host_id = IntegerField('host_id', validators=[DataRequired()])
    image_url = StringField('image_url')
    capacity = IntegerField('capacity', validators=[DataRequired(), minimum_capacity])
    public = BooleanField('public')
