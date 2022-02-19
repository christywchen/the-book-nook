from tabnanny import check
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, ValidationError
from wtforms.validators import DataRequired
from datetime import datetime

def title_length(form, field):
    # Check that title is not more than 75 characters
    title = field.data

    if title and len(title) > 75:
        raise ValidationError('Title should be 75 characters or less.')

def author_length(form, field):
    # Check that author is not more than 75 characters
    author = field.data

    if author and len(author) > 75:
        raise ValidationError('Author should be 75 characters or less.')

def orig_title_length(form, field):
    # Check that original title is not more than 75 characters
    orig_title = field.data

    if orig_title and len(orig_title) > 75:
        raise ValidationError('Original should be 75 characters or less.')

def lang_length(form, field):
    # Check that language is not more than 20 characters
    lang = field.data

    if lang and len(lang) > 20:
        raise ValidationError('Language should be 20 characters or less.')

def isbn13_length(form, field):
    # Check that isbn13 is 17 characters exactly.
    isbn13 = field.data

    if isbn13 and len(isbn13) != 17:
        raise ValidationError('ISBN13 must be 17 characters, including dashes.')

def check_year(form, field):
    # Check that value is an integer.
    year = field.data

    if year and year > datetime.now().year:
        raise ValidationError('Publication year must be a valid year.')

class BookForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), title_length])
    author = StringField('author', validators=[DataRequired(), author_length])
    synopsis = TextAreaField('synopsis')
    image_url = TextAreaField('image_url')
    isbn13 = StringField('isbn13', validators=[isbn13_length])
    original_title = StringField('original_title', validators=[orig_title_length])
    language = StringField('language', validators=[DataRequired(), lang_length])
    publication_year = IntegerField('publication_year', validators=[check_year])
    pages = IntegerField('pages')
