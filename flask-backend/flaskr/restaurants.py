import functools
import os

from flask import (
    Blueprint, json, make_response
)

from flaskr.auth import login_required
from flask import jsonify

from flaskr.db import get_db

bp = Blueprint('restaurant', __name__, url_prefix='/restaurants')

@bp.route('/', methods=["GET"])
@login_required
def get_restaurant_list():
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, "./Business_Restaurant.json")
    data = json.load(open(json_url))
    return make_response(jsonify(data), 201)
 
