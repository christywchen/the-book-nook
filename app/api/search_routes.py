from flask import Blueprint
from flask_login import login_required

from app.services import SearchService
from app.models import Book

search_routes = Blueprint('search', __name__)


@search_routes.route('/books/<query>')
@login_required
def search_books(query):
    """
    Returns all records that match a given search query.
    Searches by author and title.
    """
    books = SearchService.search_books(query)

    return {'books': [book.to_dict() for book in books]}


@search_routes.route('/books/<query>/<int:limit>')
@login_required
def search_5_books(query, limit):
    """
    Returns first five records that match a given search query.
    Searches by author and title.
    """
    books = SearchService.search_5_books(query, limit)

    return {'books': [book.to_dict() for book in books]}
