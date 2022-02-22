from flask_wtf import FlaskForm
from wtforms import IntegerField, ValidationError, TextAreaField
from wtforms.validators import DataRequired, Optional

class ChatMessageForm(FlaskForm):
    body = TextAreaField('body', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    chatroom_id = IntegerField('chatroom_id', validators=[DataRequired()])
