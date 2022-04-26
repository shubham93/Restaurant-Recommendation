import json
import random
import ast

FEATURE_LIST = ["BusinessAcceptsCreditCards", "Alcohol", "BikeParking", "CoatCheck", "WiFi", "GoodForKids", "OutdoorSeating", "RestaurantsPriceRange2", "RestaurantsReservations", "Smoking"]
FEATURE_LIST_NON_BOOLEAN = ["Alcohol", "RestaurantsPriceRange2"]


## Main mapper function to map database attributes to attributes json trpe
def get_mapped_features(features):
    features["BusinessAcceptsCreditCards"] = get_mapped_value_for_boolean(features.pop("accepts_credit_cards"))
    features["Alcohol"] = get_mapped_value_for_alcohol(features.pop("alcohol_present"))
    features["BikeParking"] = get_mapped_value_for_boolean(features.pop("bike_parking"))
    features["CoatCheck"] = get_mapped_value_for_boolean(features.pop("coat_check"))
    features["WiFi"] = get_mapped_value_for_boolean(features.pop("free_wifi_present"))
    features["GoodForKids"] = get_mapped_value_for_boolean(features.pop("good_for_kids"))
    features["OutdoorSeating"] = get_mapped_value_for_boolean(features.pop("outdoor_seating"))
    features["RestaurantsPriceRange2"] = get_mapped_value_for_price_range(features.pop("price_range"))
    features["RestaurantsReservations"] = get_mapped_value_for_boolean(features.pop("restaurant_reservation"))
    features["Smoking"] = get_mapped_value_for_boolean(features.pop("smoking"))

    for key in dict(features).items():  # removing false values 
      if (key =="user_id" or key == "id"):
          del features[key]
    return features

def get_actual_attributes(restaurant):
    attr = json.loads(restaurant["attributes"])
    attr = ast.literal_eval(attr)
    return get_filtered_attributes(attr)

def get_recommendation_data(mapped_features,restaurant_list, ratings_info):
    filter_keys = mapped_features.keys()
    if(len(filter_keys) > 0):
        result = []
        for index, restaurant in enumerate(restaurant_list):
            rest_keys = restaurant.keys()
            if "attributes" in rest_keys:
                try:
                    # attr = json.loads(restaurant["attributes"])
                    # attr = ast.literal_eval(attr)
                    # actual_attr = get_filtered_attributes(attr)
                    actual_attr = get_actual_attributes(restaurant)
                    obj = {"data": restaurant, "score": get_score(actual_attr, mapped_features, ratings_info)}
                    result.append(obj)
                ## Important because JSON has a lot of invalid values
                except SyntaxError:
                    pass
                    # print("Syntax error at ", index)
        
        result.sort(key=lambda x: x["score"])
        list = [item["data"] for item in result]
        if len(result) > 100:
            list = random.sample(list, 100)
        else:
            list = random.sample(list, len(list))
  
        return list
    else:
        return random.sample(restaurant_list, 100)

def is_value_not_None(value):
    return value != "None" and value != None and value !="'None'"

## Get manhattan distance between user features and restaurant attributes
def get_score(attributes, mapped_features, ratings_info):
    score = 0
    for key in FEATURE_LIST:
        score += (ratings_info[key] * abs(attributes[key] - mapped_features[key]))
    return score


## Method returns only the fix amount of attributes as per FEATURE_LIST
def get_filtered_attributes(attributes):
    updated_attribute = {}
    attr_keys = attributes.keys()
    for key in FEATURE_LIST:
        if key in FEATURE_LIST_NON_BOOLEAN and key in attr_keys:
            if key == "RestaurantsPriceRange2":
                updated_attribute[key] = get_mapped_value_for_price_range(attributes[key])
            elif key in attr_keys:
                updated_attribute[key] = get_mapped_value_for_alcohol(attributes[key])
        elif key in attr_keys and is_value_not_None(attributes[key]):
            updated_attribute[key] = get_mapped_value_for_boolean(attributes[key])
        else:
            updated_attribute[key] = 0
    return updated_attribute

## Map value for alcohol 
## value is intentionally 2,3 for values to increase manhattan distance between no alcohol values
def get_mapped_value_for_alcohol(value):
    if(value == "beer_and_wine"):
        return 2
    elif (value == "full_bar"):
        return 3
    else:
        return 0

## Map value for price range
def get_mapped_value_for_price_range(value):
    if(value == "None" or value == None):
        return 0
    else:
        return int(value)

def get_mapped_value_for_boolean(value):
    return int(value == "True" or value == "true")

## Logic for this is to give more fraction value so that weight multiplied when sorting 
## is less for features that were given higher ratings
## This will make the manhattan distance tends to zero and the restaurant will be in top results
def get_rating_weight(rating):
    if rating > 4:
        return 5 - rating * 0.001
    elif rating > 2:
        return 4 - rating * 0.01
    else:
        return 2 - rating * 0.1


## Method to generate feature weights based on ratings provided by the user
def get_ratings_information(ratings, restaurants):
    if(len(ratings) > 0):
        rating_info = {}
        for index, ratings_data in enumerate(ratings):
            ## Divide ratings by 10, so that we get rating per feature
            rating = float(ratings_data["rating"])/10
            restaurant = next(item for item in restaurants if item["id"] == ratings_data["restaurant_id"])
            attributes = get_actual_attributes(restaurant)
            attr_keys = attributes.keys()
            for key in attr_keys:
                if key in rating_info:
                    rating_info[key] += get_rating_weight(rating) * attributes[key]
                else:
                    rating_info[key] = get_rating_weight(rating) * attributes[key]
        return rating_info
            
    else:
        default_info = {}
        for item in FEATURE_LIST:
            default_info[item] = 1
        return default_info

## Main method to get recommendation for restaurants
def get_recommended_restaurants(restaurants, features, ratings):
    mapped_features = {}
    ratings_info = {}
    if features is not None:
        mapped_features = get_mapped_features(features)
    if ratings is not None:
        ratings_info = get_ratings_information(ratings, restaurants)
    recommendations = get_recommendation_data(mapped_features, restaurants, ratings_info)
    return json.dumps(recommendations,indent=4)


