from flask import Blueprint
from flask_login import login_required

from app.services import SearchService
from app.models import Book

search_routes = Blueprint('search', __name__)


@search_routes.route('/books/<query>')
# @login_required
def search_books(query):
    """
    Returns first five records that match a given search query.
    Searches by author and title.
    """
    titles, authors = SearchService.search_books(query)

    return {'titles': [book.to_dict() for book in titles], 'authors': [book.to_dict() for book in authors]}
