from typing import Text
from unicodedata import name
from flask_wtf import FlaskForm
from sqlalchemy import Integer
from wtforms import StringField, TextAreaField, IntegerField, ValidationError
from wtforms.validators import DataRequired

def title_length(form, field):
    # Check that title is not more than 75 characters
    title = field.data

    if len(title) > 75:
        raise ValidationError('Title should be 75 characters or less.')

def author_length(form, field):
    # Check that author is not more than 75 characters
    author = field.data

    if len(author) > 75:
        raise ValidationError('Author should be 75 characters or less.')

def orig_title_length(form, field):
    # Check that original title is not more than 75 characters
    author = field.data

    if len(author) > 75:
        raise ValidationError('Original should be 75 characters or less.')

def lang_length(form, field):
    # Check that language is not more than 20 characters
    lang = field.data

    if len(lang) > 75:
        raise ValidationError('Language should be 20 characters or less.')

def isbn_length(form, field):
    # Check that language is not more than 20 characters
    isbn = field.data

    if len(isbn) != 10:
        raise ValidationError('ISBN must be 10 characters.')

def isbn13_length(form, field):
    # Check that language is not more than 20 characters
    isbn13 = field.data

    if len(isbn13) != 13:
        raise ValidationError('ISBN13 must be 13 characters.')

class BookForm(FlaskForm):
    title = StringField('name', validators=[DataRequired(), title_length])
    author = StringField('description', validators=[DataRequired(), author_length])
    description = TextAreaField('description')
    image_url = TextAreaField('imagee_url')
    isbn = StringField('isbn', validators=[isbn_length])
    isbn13 = StringField('isbn13', validators=[isbn13_length])
    original_title = StringField('original_title', validators=[orig_title_length])
    language = StringField('language', validators=[DataRequired(), lang_length])
    publication_year = IntegerField('publication_year')
    pages = IntegerField('pages')
