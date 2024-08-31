from app import app
from flask import render_template, flash, redirect, url_for
from app.forms import LoginForm

@app.route('/')
@app.route('/index')
def index(): 
    """
    1. handlers for app routes are called view functions mapped to some url(s) so app knows 
    what logic to execute when client requests a given URL

    2. what's above this is a decorator, commonly used to register functions as callbacks for certian events
    creates an association between the path specified and the function below it
    """
    return "Hello wrld"

@app.route('/')
@app.route('/index')
def index():
    """
    html rendering: generic
    """
    user = {'username': 'Miguel'}
    # Takes in template filename, also list of template args
    # invokes Jinja template engine
    return render_template('index.html', title='Home', user=user)

@app.route('/')
@app.route('/index')
def index():
    """
    html rendering: loops 
    """
    user = {'username': 'Miguel'}
    posts = [
        {
            'author': {'username': 'John'},
            'body': 'Beautiful day in Portland!'
        },
        {
            'author': {'username': 'Susan'},
            'body': 'The Avengers movie was so cool!'
        }
    ]
    return render_template('index.html', title='Home', user=user, posts=posts)

"""
Login forms
"""

@app.route('/login')
def login():
    """
    - if you try submitting with just this, the browser will display a Method Not Allowed error 
    - this is because this can display the form on a page but it can't process the logic 
    """
    form = LoginForm()
    return render_template('login.html', title='Sign In', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    """
    - methods: accepts get and post - post allows submission of the form data to the server
    - method not allowed request before was because the browser tried to send a POST request but hte app wasn't configured to accept it
    """
    form = LoginForm()

    # form validate on submit deos all the form processing work
    # checks validations and if they fail for a post just render the form back to the user but can be handled with some error mesage

    if form.validate_on_submit():

        # flash is a good way to show a message backt o the user
        flash('Login requested for user {}, remember_me={}'.format(
            form.username.data, form.remember_me.data))
        
        # Auto-redirect back to the index page
        return redirect('/index')
    return render_template('login.html', title='Sign In', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    """
    - urlfor is a much better way to specify links because it'll internally just map view functions to the urls they're associated with 
    - if you decdie to reognizae your links without this, then it's a lot of manual labor
    - see: https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iii-web-forms (bottom)
    """
    form = LoginForm()
    if form.validate_on_submit():
        # ...
        return redirect(url_for('index'))
    # ...