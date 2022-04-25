import os
from flask import json
from flaskr.db_utils import update_db


def insert_json_into_db():
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, "./Processed_Business_Restaurant.json")
    data = json.load(open(json_url))
    count = 0
    for item in data:
        id = item["business_id"]
        business_name = item["business_name"]
        business_address = item["business_address"]
        business_city = item["business_city"]
        postal_code = item["postal_code"]
        business_state = item["business_state"]
        stars = int(item["stars"])
        review_count = int(item["review_count"])
        attributes = json.dumps(item["attributes"])
        categories = item["categories"]
        business_hours = item["business_hours"]
        update_db("INSERT INTO restaurants (id, business_name, business_address, business_city, business_state, postal_code, stars, review_count, attributes, categories, business_hours) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    (id, business_name, business_address, business_city, business_state, postal_code, stars, review_count, attributes, categories, business_hours))
        count = count + 1
    print(count, " restaurants inserted successfully")