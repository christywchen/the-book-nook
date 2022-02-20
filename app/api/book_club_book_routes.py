from flask import Blueprint, jsonify, request
from flask_login import login_required
from datetime import datetime

from app.models import db, BookClubBook

book_club_book_routes = Blueprint('book_club_books', __name__)


"""
The below route is for getting all book club book records.
"""

@book_club_book_routes.route('')
@login_required
def get_all_book_clubs():
    """
    Returns all book club books in the database.
    """
    all_book_club_books = BookClubBook.query.all()

    return {'book club books': [book_club_book.to_dict() for book_club_book in all_book_club_books]}
