from flask import Blueprint, jsonify, request
from flask_login import login_required
from datetime import datetime

from app.api.auth_routes import login
from app.models import db, Book, BookClubBook
from app.forms.book_form import BookForm

book_routes = Blueprint('books', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


"""
The below routes or for creating, reading, updating, and deleting a book.
"""

@book_routes.route('')
@login_required
def get_all_books():
    """
    Returns all books in the database.
    """
    all_books = Book.query.all()

    return {'books': [book.to_dict() for book in all_books] }


@book_routes.route('/<int:id>')
@login_required
def get_book(id):
    """
    Returns one book.
    """
    book = Book.query.get(id)

    return {'book': [book.to_dict()]}


@book_routes.route('', methods=['POST'])
@login_required
def create_book():
    """
    This route creates a new book club record and returns in.
    """
    form = BookForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        book = Book(
            title=data['title'],
            author=data['author'],
            synopsis=data['synopsis'],
            image_url=data['image_url'],
            isbn13=data['isbn13'],
            original_title=data['original_title'],
            language=data['language'],
            publication_year=data['publication_year'],
            pages=data['pages'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(book)
        db.session.commit()

        return {'book': book.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@book_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_book(id):
    """
    Updates a book record and returns it.
    """
    form = BookForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        book = Book.query.get(id)
        data = form.data

        book.title = data['title']
        book.author = data['author']
        book.synopsis = data['synopsis']
        book.image_url = data['image_url']
        book.isbn13 = data['isbn13']
        book.original_title = data['original_title']
        book.language = data['language']
        book.publication_year = data['publication_year']
        book.pages = data['pages']
        book.updated_at=datetime.now()

        db.session.commit()

        return {'book': book.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@book_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_book(id):
    """
    Deletes a book record.
    """
    book = Book.query.get(id)

    db.session.delete(book)
    db.session.commit()

    return {'message': 'Book successfully deleted.'}
