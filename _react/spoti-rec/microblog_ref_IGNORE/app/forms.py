from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired

class LoginForm(FlaskForm):
    """
    flask-wtf extension uses python classes to represent forms
    fields are vars
    validators args are just used to validity-check form inputs
    now if i weren't using something like react, i can basically make a html form for the form here, and the class knows how to unravel itself into HTML no further action needed from me
    """
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember Me')
    submit = SubmitField('Sign In')