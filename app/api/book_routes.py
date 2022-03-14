from flask import Blueprint, jsonify, request
from flask_login import login_required

from app.forms.book_form import BookForm

from app.services import BookService

book_routes = Blueprint('books', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
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
    all_books = BookService.get_all_books()

    return {'books': [book.to_dict() for book in all_books] }


@book_routes.route('/<int:id>')
@login_required
def get_book(id):
    """
    Returns one book.
    """
    book = BookService.get_one_book(id)

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

        book = BookService.create_book(data)

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
        book = BookService.get_one_book(id)
        data = form.data

        book = BookService.update_book(book, data)

        return {'book': book.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@book_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_book(id):
    """
    Deletes a book record.
    """
    book_id = BookService.delete_book(id)

    return {'message': 'Book successfully deleted.', 'book id': book_id}
