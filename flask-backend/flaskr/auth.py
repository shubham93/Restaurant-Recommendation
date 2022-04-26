import functools

from flask import (
    Blueprint, flash, g, request, session, make_response, jsonify
)
from werkzeug.security import check_password_hash, generate_password_hash

from flaskr.db import get_db
from flaskr.db_utils import *
from flask_cors import cross_origin

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=['POST'])
@cross_origin()
def register():
    error = None
    data = request.get_json()

    firstname = data['firstname']
    lastname = data['lastname']
    email = data['email']
    password = data['password']

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
            error = "User {firstname} is already registered."
    flash(error)
    if error:
        return make_response({"error" : error}, 500)
    else:
        return make_response({"data" : "User registered successfully"}, 200)

@bp.route('/login', methods=['POST'])
@cross_origin()
def login():
    error = None
    data = request.get_json()
    email = data['email']
    password = data['password']
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
        return make_response({"error" : error}, 500)
    else:
        login_response = {"user_id": session['user_id']}
        return make_response(login_response, 200)

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