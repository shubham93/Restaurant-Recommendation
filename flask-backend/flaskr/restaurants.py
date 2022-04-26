import os
from flask import (
    Blueprint, json, make_response, jsonify
)
from flaskr.auth import login_required
from flaskr.db_utils import *
from flaskr.user_modeling import get_recommended_restaurants
from flask_cors import cross_origin

bp = Blueprint('restaurant', __name__, url_prefix='/restaurants')

@bp.route('/', methods=["GET"])
@cross_origin()
@login_required
def get_restaurant_list():
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, "./Business_Restaurant.json")
    data = json.load(open(json_url))
    return make_response(jsonify(data), 201)

@bp.route('/list/<user_id>', methods=["GET"])
@cross_origin()
@login_required
def get_restaurant_data(user_id):
    resturant_list = query_db('SELECT * FROM restaurants LIMIT 20000')
    user_features = query_db('SELECT * FROM userprofile WHERE user_id = ?', (user_id,), True)
    ratings = query_db('SELECT * FROM userrating WHERE user_id = ?', (user_id,))
    resturants = get_recommended_restaurants(resturant_list, user_features, ratings)
    return make_response(resturants, 201)
 
