from flask import Blueprint, jsonify, request
from flask_login import login_required
from datetime import datetime

from backend.models import db, BookClub, BookClubChatroom, BookClubMember
from backend.forms.book_club_form import BookClubForm
from backend.models.books import Book

book_club_routes = Blueprint('book_clubs', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


"""
The below routes are for creating, reading, updating, and deleting book clubs.
"""

@book_club_routes.route('')
def get_all_book_clubs():
    """
    Returns all book clubs in the database.
    """
    all_book_clubs = BookClub.query.all()

    return {"book clubs": [book_club.to_dict() for book_club in all_book_clubs]}


@book_club_routes.route('/<int:id>')
def get_book_club(id):
    """
    Returns one book club.
    """
    book_club = BookClub.query.get(id)

    return { "book club": [book_club.to_dict()]}


@book_club_routes.route('', methods=['POST'])
def create_book_club():
    """
    Instantiates a book club and two chatrooms for the book club.
    It also adds the host as the first member of the book club.

    Returns the new book club record.
    """
    form = BookClubForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # instantiate a book club
    if form.validate_on_submit():
        data = form.data

        book_club = BookClub(
            name=data['name'],
            description=data['description'],
            host_id=data['host_id'],
            capacity=data['capacity'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(book_club)
        db.session.commit()

        book_club_id = book_club.to_dict()['id']

        #
        #
        #
        # instantiate two chatrooms
        #
        #
        #

        # add host user as book club member
        new_member = BookClubMember(
            book_club_id=book_club_id,
            user_id=data['host_id'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(new_member)
        db.session.commit()

        return { "book club": [book_club.to_dict()]}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@book_club_routes.route('/<int:id>', methods=['PUT'])
def update_book_club(id):
    """
    Updates a book club record and returns it.
    """
    form = BookClubForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        book_club = BookClub.query.get(id)
        data = form.data

        book_club.name = data['name'],
        book_club.description = data['description'],
        book_club.host_id = data['host_id'],
        book_club.capacity = data['capacity'],
        book_club.updated_at = datetime.now()

        db.session.commit()

        return {"book club": [book_club.to_dict()]}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@book_club_routes.route('/<int:id>', methods=['DELETE'])
def delete_book_club(id):
    """
    Deletes a book club record.
    """
    book_club = BookClub.query.get(id)

    db.session.delete(book_club)
    db.session.commit()

    return {"message": "Book Club successfully deleted."}


"""
The below routes are for creating and deleting book club memberships.
"""
@book_club_routes.route('/<int:book_club_id>/users/<int:user_id>', methods=['POST'])
def create_book_club_member(book_club_id, user_id):
    """
    Creates a new book club member record and returns the record.
    """
    book_club_member = BookClubMember(
        book_club_id=book_club_id,
        user_id=user_id,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    db.session.add(book_club_member)
    db.session.commit()

    return {"book club member": [book_club_member.to_dict()]}


@book_club_routes.route('/<int:book_club_id>/users/<int:user_id>', methods=['DELETE'])
def delete_book_club_member(book_club_id, user_id):
    """
    Deletes a book club member record.
    """
    book_club_member = BookClubMember.query.filter(BookClubMember.book_club_id == book_club_id, BookClubMember.user_id == user_id).first()

    db.session.delete(book_club_member)
    db.session.commit()

    return {"message": "Book club member successfully deleted."}
