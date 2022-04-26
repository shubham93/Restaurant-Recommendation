import json
import ast

FEATURE_LIST = ["BusinessAcceptsCreditCards", "Alcohol", "BikeParking", "CoatCheck", "WiFi", "GoodForKids", "OutdoorSeating", "RestaurantsPriceRange2", "RestaurantsReservations", "Smoking"]
FEATURE_LIST_NON_BOOLEAN = ["Alcohol", "RestaurantsPriceRange2"]
RATING_THRESHOLD = 5


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

def get_recommendation_data(mapped_features,restaurant_list, ratings_info, ratings_count):
    filter_keys = mapped_features.keys()
    if(len(filter_keys) > 0):
        result = []
        for restaurant in restaurant_list:
            rest_keys = restaurant.keys()
            if "attributes" in rest_keys:
                try:
                    actual_attr = get_actual_attributes(restaurant)
                    obj = {"data": restaurant, "score": get_score(actual_attr, mapped_features, ratings_info, ratings_count)}
                    result.append(obj)
                ## Important because JSON has a lot of invalid values
                except SyntaxError:
                    pass
                    # print("Syntax error at ", index)
        
        result.sort(key=lambda x: x["score"])
        r = next(item for item in result if item["data"]["id"] == "INGFx5d5dnmhw0wfkDqx2g")
        print("Score of r...", r["score"])
        list = [item["data"] for item in result]
        if len(result) > 100:
            list = list[0:100]
        return list
    else:
        return restaurant_list[0:100]

def is_value_not_None(value):
    return value != "None" and value != None and value !="'None'"

## Code to evaluate the actual feature value 
## Takes into consideration the mapped feature and the rating info
def get_actual_feature_value(ratings_feature, mapped_feature, ratings_count):
    if ratings_count > RATING_THRESHOLD:
        return ratings_feature
    else:
        weight = ratings_count/RATING_THRESHOLD
        return round(abs((1 - weight)*mapped_feature - (weight * ratings_count)))

## Get manhattan distance between user features and restaurant attributes
def get_score(attributes, mapped_features, ratings_info, ratings_count):
    score = 0
    for key in FEATURE_LIST:
        score += abs(attributes[key] - get_actual_feature_value(mapped_features[key], ratings_info[key], ratings_count))
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

## Method to return rating weight
## This is to ensure that recent ratings have a higher weightage
def get_rating_weight(index, rating):
    if index < RATING_THRESHOLD:
        return rating
    elif index < 2*RATING_THRESHOLD:
        return 0.5*rating
    else:
        return 0.1*rating



## Method to generate feature weights based on ratings provided by the user
def get_ratings_information(ratings, restaurants):
    ratings_count = len(ratings)
    if(ratings_count > 0):
        rating_info = {}

        for index, ratings_data in enumerate(ratings):
            ## Divide ratings by 5, so that we get rating per feature
            ## Since 10 is feature count and rating is between 0,5 weight of each rating is 2
            ## So actual rating will be rating * 2/ 10 = rating/5
            rating = float(ratings_data["rating"])/RATING_THRESHOLD
            restaurant = next(item for item in restaurants if item["id"] == ratings_data["restaurant_id"])
            # print("Restaurant...", restaurant)
            attributes = get_actual_attributes(restaurant)
            attr_keys = attributes.keys()
            for key in attr_keys:
                if key in rating_info:
                    rating_info[key] += get_rating_weight(index, rating) * attributes[key]
                else:
                    rating_info[key] = get_rating_weight(index, rating)* attributes[key]
        
        for key in rating_info:
            rating_info[key] = rating_info[key]/ratings_count
        return rating_info, ratings_count
            
    else:
        default_info = {}
        for item in FEATURE_LIST:
            default_info[item] = 1
        return default_info, 0

## Main method to get recommendation for restaurants
def get_recommended_restaurants(restaurants, features, ratings):
    mapped_features = {}
    ratings_info = {}
    if features is not None:
        mapped_features = get_mapped_features(features)
    if ratings is not None:
        ratings_info, ratings_count = get_ratings_information(ratings, restaurants)
    print("Rating Info..." ,ratings_info)
    recommendations = get_recommendation_data(mapped_features, restaurants, ratings_info, ratings_count)
    return json.dumps(recommendations,indent=4)


