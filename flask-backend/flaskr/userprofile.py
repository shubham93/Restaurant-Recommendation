import os
from flask import (
    Blueprint, json, make_response, jsonify, request, flash
)
from flaskr.auth import login_required
from flaskr.db_utils import *
from flask_cors import cross_origin

bp = Blueprint('profile', __name__, url_prefix='/profile')

@bp.route('/<user_id>', methods=["GET", "PUT", "POST"])
@cross_origin()
def features_list(user_id):
    print("User id ....", user_id)
    user_features = query_db('SELECT * FROM userprofile WHERE user_id = ?', (user_id,), True)
    error = None
    if request.method == "POST" and user_features is not None:
        error = "POST request not supported for existing user"
        return make_response({"error" : error}, 400)
    if request.method == 'POST' or request.method == 'PUT':
        data = request.get_json()
        alcohol_present = data["alcohol_present"]
        free_wifi_present = data["free_wifi_present"]
        accepts_credit_cards = data["accepts_credit_cards"]
        bike_parking  = data["bike_parking"]
        good_for_kids = data["good_for_kids"]
        restaurant_reservation = data["restaurant_reservation"]
        outdoor_seating = data["outdoor_seating"]
        smoking = data["smoking"]
        coat_check = data["coat_check"]
        price_range = data["price_range"]
        query = None
        print("coat_check val...", coat_check)
        if request.method == 'POST':
            query = "INSERT INTO userprofile (alcohol_present, free_wifi_present, accepts_credit_cards, bike_parking, good_for_kids, restaurant_reservation, outdoor_seating, smoking, coat_check, price_range, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        else:
            query = "UPDATE userprofile SET alcohol_present = ?, free_wifi_present = ?, accepts_credit_cards = ?, bike_parking = ?, good_for_kids = ?, restaurant_reservation = ?, outdoor_seating = ?, smoking = ?, coat_check = ?, price_range = ? WHERE user_id = ?"
        try:
            update_db(query, (alcohol_present, free_wifi_present, accepts_credit_cards, bike_parking, good_for_kids, restaurant_reservation, outdoor_seating, smoking, coat_check, price_range, user_id))
            user_features = query_db('SELECT * FROM userprofile WHERE user_id = ?', (user_id,), True)
            return make_response(jsonify(user_features), 200)
        except: 
            error = "Db operation unsuccessful"
    if error:
        flash(error)
        return make_response({"error" : error}, 400)
    ## Code assumes that the errors have been handled and only get request handling will be left
    else:
        user_features = query_db('SELECT * FROM userprofile WHERE user_id = ?', (user_id,), True)
        if user_features is None:
            user_features = {}
        return make_response(jsonify(user_features), 201)