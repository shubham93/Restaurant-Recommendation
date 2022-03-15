import functools

from flask import (
    Blueprint, flash, g, request, session, make_response
)

from flaskr.auth import login_required

from flaskr.db import get_db

bp = Blueprint('restaurant', __name__, url_prefix='/restaurants')

@bp.route('/', methods=["GET"])
@login_required
def get_restaurant_list():
    ##TODO: Replace this code with JSON file
    return {
        "restaurant_name": "Spice N Rice",
        "location": "Dublin 1",
        "budget": "20",
    }
 
