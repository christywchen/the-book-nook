from flask import Blueprint, jsonify, request
from flask_login import login_required
from datetime import datetime

from app.models import db, BookClub, BookClubChatroom, BookClubMember, Book, BookClubBook
from app.forms.book_club_form import BookClubForm
from app.forms.book_club_book_form import BookClubBookForm

book_club_routes = Blueprint('book_clubs', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}:{error}')
    return errorMessages


"""
The below routes are for creating, reading, updating, and deleting book clubs.
"""

@book_club_routes.route('')
@login_required
def get_all_book_clubs():
    """
    Returns all book clubs in the database.
    """
    all_book_clubs = BookClub.query.all()

    return {'book clubs': [book_club.to_dict() for book_club in all_book_clubs]}


@book_club_routes.route('/<int:id>')
@login_required
def get_book_club(id):
    """
    Returns one book club.
    """
    book_club = BookClub.query.get(id)

    return {'book club': [book_club.to_dict()]}


@book_club_routes.route('', methods=['POST'])
@login_required
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

        book_clubs_joined = BookClubMember.query.filter(BookClubMember.user_id == data['host_id']).all()
        joined_club_count = len(book_clubs_joined)

        if joined_club_count >= 5:
            return {'errors': ['Users may only join or host up to 5 book clubs.']}, 401

        try:
            book_club = BookClub(
                name=data['name'],
                description=data['description'],
                host_id=data['host_id'],
                capacity=data['capacity'],
                public=data['public'],
                created_at=datetime.now(),
                updated_at=datetime.now()
            )

            db.session.add(book_club)
            db.session.commit()

            book_club_id = book_club.to_dict()['id']

            # instantiate two chatrooms for the book club
            general_chat = BookClubChatroom(
                name='General',
                book_club_id=book_club_id,
                created_at=datetime.now(),
                updated_at=datetime.now()
            )

            spoilers_chat = BookClubChatroom(
                name='Spoilers',
                book_club_id=book_club_id,
                created_at=datetime.now(),
                updated_at=datetime.now()
            )

            # add host user as book club member
            new_member = BookClubMember(
                book_club_id=book_club_id,
                user_id=data['host_id'],
                created_at=datetime.now(),
                updated_at=datetime.now()
            )

            db.session.add(general_chat)
            db.session.add(spoilers_chat)
            db.session.add(new_member)
            db.session.commit()

            return { 'book club': book_club.to_dict()}
        except:
            return {'errors': ['There was an error during Book Club creation.']}, 401

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@book_club_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_book_club(id):
    """
    Updates a book club record and returns it.
    """
    form = BookClubForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        book_club = BookClub.query.get(id)
        data = form.data

        book_club_members = BookClubMember.query.filter(BookClubMember.book_club_id == id).all()
        member_count = len(book_club_members)

        if data['capacity'] < member_count:
            return {'errors': ['Member capacity may not be less than the current member count.']}, 401

        book_club.name = data['name'],
        book_club.description = data['description'],
        book_club.host_id = data['host_id'],
        book_club.capacity = data['capacity'],
        book_club.updated_at = datetime.now()

        db.session.commit()

        return {'book club': book_club.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@book_club_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_book_club(id):
    """
    Deletes a book club record.
    """
    book_club = BookClub.query.get(id)

    db.session.delete(book_club)
    db.session.commit()

    return {'message': 'Book Club successfully deleted.'}


"""
The below routes are for creating, reading, and deleting book club memberships.
"""

@book_club_routes.route('/<int:book_club_id>/users')
@login_required
def get_book_club_members(book_club_id):
    """
    Gets all members of a book club.
    """
    book_club_members = BookClubMember.query.filter(BookClubMember.book_club_id == book_club_id).all()

    return {'book club members': [member.to_dict() for member in book_club_members]}


@book_club_routes.route('/<int:book_club_id>/users/<int:user_id>', methods=['POST'])
@login_required
def create_book_club_member(book_club_id, user_id):
    """
    Creates a new book club member record and returns the record.
    """
    book_clubs_joined = BookClubMember.query.filter(BookClubMember.user_id == user_id).all()
    joined_club_count = len(book_clubs_joined)

    if (joined_club_count >= 5):
        return {'errors': ['Users may only join or host up to 5 book clubs.']}, 401

    book_club_member = BookClubMember(
        book_club_id=book_club_id,
        user_id=user_id,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    db.session.add(book_club_member)
    db.session.commit()

    return {'book club member': book_club_member.to_dict()}


@book_club_routes.route('/<int:book_club_id>/users/<int:user_id>', methods=['DELETE'])
@login_required
def delete_book_club_member(book_club_id, user_id):
    """
    Deletes a book club member record.
    """
    book_club_member = BookClubMember.query.filter(BookClubMember.book_club_id == book_club_id, BookClubMember.user_id == user_id).first()
    membership_id = book_club_member.id

    db.session.delete(book_club_member)
    db.session.commit()

    return {'message': 'Book club member successfully deleted.', 'membership id': membership_id}


"""
The below routes are for creating, reading, updating, and deleting book club books.
"""

@book_club_routes.route('/<int:book_club_id>/books')
@login_required
def get_book_club_books(book_club_id):
    """
    Gets all of a book club's books.
    """
    book_club_books = BookClubBook.query.filter(BookClubBook.book_club_id == book_club_id)

    return {'book club books': [book_club_book.to_dict() for book_club_book in book_club_books]}


@book_club_routes.route('/<int:book_club_id>/books', methods=['POST'])
@login_required
def add_book_club_book(book_club_id):
    """
    Adds a book to a book club.
    """
    form = BookClubBookForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        book_club_book = BookClubBook(
            book_id=data['book_id'],
            book_club_id=data['book_club_id'],
            added_by_id=data['added_by_id'],
            status=data['status'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(book_club_book)
        db.session.commit()

        return {'book club book': book_club_book.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@book_club_routes.route('/<int:book_club_id>/books/<int:book_club_book_id>', methods=['PATCH'])
@login_required
def update_book_club_book(book_club_id, book_club_book_id):
    """
    Updates a book club record and returns it.
    """
    form = BookClubBookForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        book_club_book = BookClubBook.query.get(book_club_book_id)
        data = form.data

        book_club_book.status = data['status']

        db.session.commit()

        return {'book club book': book_club_book.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@book_club_routes.route('/<int:book_club_id>/books/<int:book_id>', methods=['DELETE'])
@login_required
def delete_book_club_book(book_club_id, book_id):
    """
    Deletes a book club member record.
    """
    book_club_book = BookClubBook.query.filter(BookClubBook.book_club_id == book_club_id, BookClubBook.book_id == book_id).first()
    book_club_book_id = book_club_book.id

    db.session.delete(book_club_book)
    db.session.commit()

    return {'message': 'Book club book successfully deleted.', 'book club book id': book_club_book_id}
