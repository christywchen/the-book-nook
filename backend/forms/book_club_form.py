from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, TextAreaField, IntegerField, ValidationError
from wtforms.validators import DataRequired

def name_length(form, field):
    # Check that name is not more than 40 characters
    name = field.data

    if len(name) > 40:
        raise ValidationError('Book club name cannot be more than 100 characters.')

def description_length(form, field):
    # Check that description is not more than 100 characters
    description = field.data

    if description and len(description) > 100:
        raise ValidationError('Description cannot be more than 100 characters.')

def minimum_capacity(form, field):
    # Check that capacity is more than 0
    capacity = field.data

    if capacity <= 0:
        raise ValidationError('Book club capacity cannot be less than 0.')


class BookClubForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description', validators=[description_length])
    host_id = IntegerField('host_id', validators=[DataRequired()])
    capacity = IntegerField('capacity')
    public = BooleanField('public')
