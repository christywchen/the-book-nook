from flask.cli import AppGroup

from .users import seed_users, undo_users
from .book_clubs import seed_book_clubs, undo_book_clubs
from .book_club_members import seed_book_club_members, undo_book_club_members
from .book_club_chatrooms import seed_book_club_chatrooms, undo_book_club_chatrooms
from .chatrooms_messages import seed_chatroom_messages, undo_chatroom_messages

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_book_clubs()
    seed_book_club_members()
    seed_book_club_chatrooms()
    seed_chatroom_messages()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_book_clubs()
    undo_book_club_members()
    undo_book_club_chatrooms()
    undo_chatroom_messages()


# Creates the `flask seed reset` command
@seed_commands.command('reset')
def reset():
    # Undo seeds
    undo_users()
    undo_book_clubs()
    undo_book_club_members()
    undo_book_club_chatrooms()
    undo_chatroom_messages()

    # Redo seeds
    seed_users()
    seed_book_clubs()
    seed_book_club_members()
    seed_book_club_chatrooms()
    seed_chatroom_messages()
