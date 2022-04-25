import os
from flask import (
    Blueprint, json, make_response, jsonify, request, flash
)
from flaskr.auth import login_required
from flaskr.db_utils import *
from flask_cors import cross_origin

bp = Blueprint('ratings', __name__, url_prefix='/ratings')

@bp.route('/<user_id>/<restaurant_id>', methods=["GET", "PUT", "POST"])
@cross_origin()
@login_required
def user_ratings(user_id, restaurant_id):
    print("User id ....", user_id)
    print("Restaurant id ....", restaurant_id)
    rating_info = query_db('SELECT * FROM userrating WHERE user_id = ? AND restaurant_id = ?', (user_id,restaurant_id), True)
    if request.method == "GET":
        if rating_info is None:
            rating_info = {}
        return make_response(jsonify(rating_info), 201)
    error = None
    if request.method == "POST" and rating_info is not None:
        error = "POST request not supported for existing rating"
        return make_response({"error": error}, 400)
    if request.method == 'POST' or request.method == 'PUT':
        rating = request.form["rating"]
        if request.method == 'POST':
            query = "INSERT INTO userrating (rating, user_id, restaurant_id) VALUES (?, ?, ?)"
        else:
            query = "UPDATE userrating SET rating = ? WHERE user_id = ? AND restaurant_id = ?"
        try:
            update_db(query, (rating, user_id, restaurant_id))
            rating_info = query_db('SELECT * FROM userrating WHERE user_id = ? AND restaurant_id = ?', (user_id,restaurant_id), True)
            return make_response(jsonify(rating_info), 200)
        except: 
            error = "Db operation unsuccessful"
    if error:
        flash(error)
        return make_response({"error": error}, 400)