import json
import random

def get_mapped_features(features):
    features['BusinessAcceptsCreditCards'] = features.pop('accepts_credit_cards')
    features['Alcohol'] = features.pop('alcohol_present')
    features['BikeParking'] = features.pop('bike_parking')
    features['CoatCheck'] = features.pop('coat_check')
    features['WiFi'] = features.pop('free_wifi_present')
    features['GoodForKids'] = features.pop('good_for_kids')
    features['OutdoorSeating'] = features.pop('outdoor_seating')
    features['RestaurantsPriceRange2'] = features.pop('price_range')
    features['RestaurantsReservations'] = features.pop('restaurant_reservation')
    features['Smoking'] = features.pop('smoking')
      

    
    for key, value in dict(features).items():  # changing data type to int for comaarison
       if(type(value) == bool or type(value) == int):
           features[key]= str(value) 
           #print(value, type(value)) 

    for key, value in dict(features).items():  # removing false values 
      if (value == "False" or value == "false" or key =="user_id" or key == "id"):
          del features[key]

    # print("Features...", features)
    return features

def get_recommendation_data(mapped_features,restaurant_list):
    filter_keys = mapped_features.keys()
    if(len(filter_keys) > 0):
        result = []
        for restaurant in (restaurant_list):
            print("Restaurant...", restaurant)
            if hasattr(restaurant, "attributes"):
                print("in attributes")
                attr = json.loads(restaurant['attributes'])
                attr_keys = attr.keys()
                temp = []
                print("Filter keys...", filter_keys)
                print("Attr keys...", attr_keys)
                for fk in filter_keys:
                    if fk in attr_keys:
                        if mapped_features[fk] == attr[fk]:
                            temp.append(fk)
                if len(filter_keys) == len(temp):
                        result.append(restaurant)

            #list=random.sample(result,100)
            #print(json.dumps(result[:10],indent=4))
        # print("Result...", result)
        if len(result) > 100:
            list = random.sample(result, 100)
        else:
            list = random.sample(result, len(result))
  
        return list
    else:
        return random.sample(restaurant_list, 100)


def get_recommended_restaurants(restaurants, features):
    mapped_features = {}
    if features is not None:
        mapped_features = get_mapped_features(features)
    recommendations = get_recommendation_data(mapped_features, restaurants)
    return json.dumps(recommendations,indent=4)


