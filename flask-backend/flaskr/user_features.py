import os
from flask import (
    Blueprint, json, make_response, jsonify, request, flash
)
from flaskr.auth import login_required
from flaskr.db_utils import *
from flask_cors import cross_origin

bp = Blueprint('features', __name__, url_prefix='/features')

@bp.route('/<user_id>', methods=["GET", "PUT", "POST"])
@cross_origin()
@login_required
def features_list(user_id):
    print("User id ....", user_id)
    user_features = query_db('SELECT * FROM userfeatures WHERE user_id = ?', (user_id,), True)
    error = None
    if request.method == "POST" and user_features is not None:
        error = "POST request not supported for existing user"
        return make_response(error, 400)
    if request.method == 'POST' or request.method == 'PUT':
        alcohol_present = request.form["alcohol_present"]
        free_wifi_present = request.form["free_wifi_present"]
        accepts_credit_cards = request.form["accepts_credit_cards"]
        bike_parking  = request.form["bike_parking"]
        good_for_kids = request.form["good_for_kids"]
        restaurant_reservation = request.form["restaurant_reservation"]
        outdoor_seating = request.form["outdoor_seating"]
        smoking = request.form["smoking"]
        coat_check = request.form["coat_check"]
        price_range = request.form["price_range"]
        query = None
        print("coat_check val...", coat_check)
        if request.method == 'POST':
            query = "INSERT INTO userfeatures (alcohol_present, free_wifi_present, accepts_credit_cards, bike_parking, good_for_kids, restaurant_reservation, outdoor_seating, smoking, coat_check, price_range, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        else:
            query = "UPDATE userfeatures SET alcohol_present = ?, free_wifi_present = ?, accepts_credit_cards = ?, bike_parking = ?, good_for_kids = ?, restaurant_reservation = ?, outdoor_seating = ?, smoking = ?, coat_check = ?, price_range = ? WHERE user_id = ?"
        try:
            update_db(query, (alcohol_present, free_wifi_present, accepts_credit_cards, bike_parking, good_for_kids, restaurant_reservation, outdoor_seating, smoking, coat_check, price_range, user_id))
            user_features = query_db('SELECT * FROM userfeatures WHERE user_id = ?', (user_id,), True)
            return make_response(jsonify(user_features), 200)
        except error: 
            error = "Db operation unsuccessful"
    if error:
        flash(error)
        return make_response(error, 400)
    ## Code assumes that the errors have been handled and only get request handling will be left
    else:
        user_features = query_db('SELECT * FROM userfeatures WHERE user_id = ?', (user_id,), True)
        if user_features is None:
            user_features = {}
        return make_response(jsonify(user_features), 201)
 
