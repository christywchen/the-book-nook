from flask_wtf import FlaskForm
from wtforms import IntegerField, ValidationError
from wtforms.validators import DataRequired, Optional

class BookClubBookForm(FlaskForm):
    book_id = IntegerField('book_id')
    book_club_id = IntegerField('book_club_id')
    added_by_id = IntegerField('added_by_id')
    status = IntegerField('status')
