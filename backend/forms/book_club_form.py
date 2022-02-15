from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, TextAreaField, IntegerField
from wtforms.validators import DataRequired

class BookClubForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description')
    host_id = IntegerField('host_id', validators=[DataRequired()])
    capacity = IntegerField('capacity')
    public = BooleanField('public')
