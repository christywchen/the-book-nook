from flask import Blueprint, jsonify, request
from flask_login import login_required
from datetime import datetime
from app.api.user_routes import user

from app.models import db, BookClub, BookClubChatroom, BookClubMember, Book, BookClubBook
from app.forms.book_club_form import BookClubForm
from app.forms.book_club_book_form import BookClubBookForm

from app.services import BookClubService, UserService, ChatroomService, BookClubMemberService, BookClubBookService

book_club_routes = Blueprint('book_clubs', __name__)


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
The below routes are for creating, reading, updating, and deleting book clubs.
"""

@book_club_routes.route('')
@login_required
def get_all_book_clubs():
    """
    Returns all book clubs in the database.
    """
    all_book_clubs = BookClubService.get_all_book_clubs()

    return {'book clubs': [book_club.to_dict() for book_club in all_book_clubs]}


@book_club_routes.route('/<int:id>')
@login_required
def get_book_club(id):
    """
    Returns one book club.
    """
    book_club = BookClubService.get_one_book_club(id)

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

        user_memberships = BookClubMemberService.get_user_book_clubs(data['host_id'])
        user_membership_count = len(user_memberships)

        if user_membership_count >= 5:
            return {'errors': {'memberships exceeded': 'Users may only join or host up to 5 book clubs.'}}, 401

        try:
            book_club = BookClubService.create_book_club(data)

            book_club_id = book_club.to_dict()['id']

            # instantiate two chatrooms for the book club
            ChatroomService.create_chatroom('General', book_club_id)
            ChatroomService.create_chatroom('Spoilers', book_club_id)

            # add host user as book club member
            BookClubMemberService.create_membership(book_club_id, data['host_id'])

            return { 'book club': book_club.to_dict()}
        except:
            return {'errors': {'error': 'There was an error during Book Club creation.'}}, 401

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
        book_club = BookClubService.get_one_book_club(id)
        data = form.data

        book_club_memberships = BookClubMemberService.get_memberships_by_club(id)
        member_count = len(book_club_memberships)

        if data['capacity'] < member_count:
            return {'errors': {'capacity': 'Capacity may not be less than the current member count.'}}, 401

        BookClubService.update_book_club(book_club, data)

        return {'book club': book_club.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@book_club_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_book_club(id):
    """
    Deletes a book club record.
    """
    BookClubService.delete_book_club(id)

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
    book_club_members = BookClubMemberService.get_memberships_by_club(book_club_id)

    return {'book club members': [member.to_dict() for member in book_club_members]}


@book_club_routes.route('/<int:book_club_id>/users/<int:user_id>', methods=['POST'])
@login_required
def create_book_club_member(book_club_id, user_id):
    """
    Creates a new book club member record and returns the record.
    """
    book_clubs_joined = BookClubMemberService.get_user_book_clubs(user_id)
    joined_club_count = len(book_clubs_joined)

    book_club_members = BookClubMemberService.get_memberships_by_club(book_club_id)
    book_club_member_count = len(book_club_members)

    book_club = BookClubService.get_one_book_club(book_club_id)
    book_club_capacity = book_club.capacity

    if book_club_member_count >= book_club_capacity:
        return {'errors': {'capacity': 'This book club has reached maximum capacity.'}}, 401

    if joined_club_count >= 5:
        return {'errors': {'memberships exceeded': 'Users may only join or host up to 5 book clubs.'}}, 401

    # creates book club membership if no errors are found
    book_club_member = BookClubMemberService.create_membership(book_club_id, user_id)

    return {'book club member': book_club_member.to_dict()}


@book_club_routes.route('/<int:book_club_id>/users/<int:user_id>', methods=['DELETE'])
@login_required
def delete_book_club_member(book_club_id, user_id):
    """
    Deletes a book club member record.
    """
    membership_id = BookClubMemberService.delete_membership(book_club_id, user_id)

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
    book_club_books = BookClubBookService.get_books_by_club(book_club_id)

    return {'book club books': [book_club_book.to_dict() for book_club_book in book_club_books]}


@book_club_routes.route('/<int:book_club_id>/books/<int:book_id>', methods=['POST'])
@login_required
def add_book_club_book(book_club_id, book_id):
    """
    Adds a book to a book club.
    """
    form = BookClubBookForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        book_club_book = BookClubBookService.get_book_by_club(book_club_id, book_id)

        print(book_club_book)

        if book_club_book:
            return {'errors': ['This book is already on this book club\'s reading list.']}, 401

        book_club_book = BookClubBook(
            book_club_id=data['book_club_id'],
            book_id=data['book_id'],
            added_by_id=data['added_by_id'],
            status=data['status'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(book_club_book)
        db.session.commit()

        return {'book club book': book_club_book.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@book_club_routes.route('/<int:book_club_id>/books/<int:book_id>', methods=['PATCH'])
@login_required
def update_book_club_book(book_club_id, book_id):
    """
    Updates a book club book record and returns it.
    """
    form = BookClubBookForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        book_club_book = BookClubBook.query.filter(BookClubBook.book_club_id == book_club_id, BookClubBook.book_id == book_id).first()
        data = form.data

        book_club_book.status = data['status']

        db.session.commit()

        return {'book club book': book_club_book.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@book_club_routes.route('/<int:book_club_id>/books/<int:book_id>', methods=['DELETE'])
@login_required
def delete_book_club_book(book_club_id, book_id):
    """
    Deletes a book club book record.
    """
    book_club_book = BookClubBook.query.filter(BookClubBook.book_club_id == book_club_id, BookClubBook.book_id == book_id).first()
    book_club_book_id = book_club_book.id

    db.session.delete(book_club_book)
    db.session.commit()

    return {'message': 'Book club book successfully deleted.', 'book club book id': book_club_book_id}


"""
The below routes are for getting chatrooms associated with a book club.
"""

@book_club_routes.route('/<int:book_club_id>/chatrooms')
@login_required
def get_book_club_chatrooms(book_club_id):
    """
    Get all of a book club's chatrooms.
    """
    chatrooms = BookClubChatroom.query.filter(BookClubChatroom.book_club_id == book_club_id).all()

    return {'chatrooms': [chatroom.to_dict() for chatroom in chatrooms]}
