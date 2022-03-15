from tabnanny import check
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, ValidationError
from wtforms.validators import DataRequired, Optional
from datetime import datetime

def title_length(form, field):
    # Check that title is not more than 75 characters
    title = field.data

    if len(title) > 75:
        raise ValidationError('Title should be 150 characters or less.')


def author_length(form, field):
    # Check that author is not more than 75 characters
    author = field.data

    if len(author) > 75:
        raise ValidationError('Author should be 150 characters or less.')


def orig_title_length(form, field):
    # Check that original title is not more than 75 characters
    orig_title = field.data

    if len(orig_title) > 75:
        raise ValidationError('Original title should be 150 characters or less.')


def lang_length(form, field):
    # Check that language is not more than 20 characters
    lang = field.data

    if len(lang) > 20:
        raise ValidationError('Language should be 50 characters or less.')


def isbn13_length(form, field):
    # Check that isbn13 is 17 characters exactly.
    isbn13 = field.data

    if len(isbn13) != 13:
        raise ValidationError('Must be 13 digits, no dashes.')


def check_year(form, field):
    # Check that value is an integer.
    year = field.data

    if year > datetime.now().year:
        raise ValidationError('Year must be valid.')


def page_length(form, field):
    # Check that value is an integer.
    pages = field.data

    if pages <= 0:
        raise ValidationError('Page count must be at least 1.')


class BookForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), title_length])
    author = StringField('author', validators=[DataRequired(), author_length])
    synopsis = TextAreaField('synopsis')
    image_url = TextAreaField('image_url')
    image_name = TextAreaField('image_name')
    isbn13 = StringField('isbn13', validators=[Optional(), isbn13_length])
    original_title = StringField('original_title', validators=[Optional(), orig_title_length])
    language = StringField('language', validators=[DataRequired(), lang_length])
    publication_year = IntegerField('publication_year', validators=[Optional(), check_year])
    pages = IntegerField('pages', validators=[Optional(), page_length])
