from datetime import datetime

from app.models import db, User


class UserService:
    """
    Services the User model.
    """

    def create_user(data):
        """
        Create a new user and set them to online.
        """
        user = User(
            username=data['username'],
            email=data['email'],
            password=data['password'],
            is_online=True,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(user)
        db.session.commit()

        return user


    def get_all_users():
        """
        Query all users.
        """
        users = User.query.all()

        return users


    def get_one_user(user_id):
        """
        Query one user.
        """
        user = User.query.get(user_id)

        return user


    def set_user_online(user_email):
        """
        Sets a user status to online.
        """
        user = User.query.filter(User.email == user_email).first()
        user.is_online = True

        db.session.commit()

        return user


    def set_user_offline(user_id):
        """
        Sets a user status to offline.
        """
        user = User.query.filter(User.id == user_id).first()
        user.is_online = False

        db.session.commit()

        return user
