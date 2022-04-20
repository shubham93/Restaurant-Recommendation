import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, make_response
)
from werkzeug.security import check_password_hash, generate_password_hash

from flaskr.db import get_db
from flaskr.db_utils import *

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=['POST'])
def register():
    error = None
    firstname = request.form['firstname']
    lastname = request.form['lastname']
    email = request.form['email']
    password = request.form['password']

    if not firstname:
        error = 'Firstname is required.'
    elif not lastname:
        error = 'Lastname is required.'
    elif not email:
        error = 'Email is required.'
    elif not password:
        error = 'Password is required.'

    if error is None:
        try:
            update_db( "INSERT INTO user (firstname, lastname, email, password) VALUES (?, ?, ?, ?)",
                (firstname, lastname, email, generate_password_hash(password)))
        except db.IntegrityError:
            error = f"User {firstname} is already registered."
    flash(error)
    if error:
        return make_response(error, 500)
    else:
        return make_response("User registered successfully", 200)

@bp.route('/login', methods=['POST'])
def login():
    error = None
    email = request.form['email']
    password = request.form['password']
    user = query_db('SELECT * FROM user WHERE email = ?', (email,), True)

    if user is None:
        error = 'Incorrect email.'
    elif not check_password_hash(user['password'], password):
        error = 'Incorrect password.'

    if error is None:
        session.clear()
        session['user_id'] = user['id']

    flash(error)
    if error:
        return make_response(error, 500)
    else:
        return make_response("User logged in successfully", 200)

@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM user WHERE id = ?', (user_id,)
        ).fetchone()

def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return make_response("User not logged in", 400)

        return view(**kwargs)

    return wrapped_view

@bp.route('/logout')
def logout():
    session.clear()
    return make_response("User logged out successfully", 200)

