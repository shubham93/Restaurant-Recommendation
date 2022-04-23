# %%
import json
import random
f = open('featuresNew.json')
features=json.load(f)
fr = open('Business_Restaurant.json')
Business_Restaurant=json.load(fr)

# print(type(features))
# print(type(features))
# print(features)


# %%
def mapper(features):
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
      if (value == "False" or value == "false"):
          del features[key]


    return features

# %%


Feature_mapped= mapper(features)
print(type(Feature_mapped))
print(Feature_mapped)

# %%
def get_recommendation_data(Feature_mapped,Business_Restaurant):
        filter_keys = Feature_mapped.keys()
        result = []
        for restaurant in (Business_Restaurant):
                if 'attributes' in restaurant:
                        try:
                                attr = json.loads(restaurant['attributes'])
                                attr_keys = attr.keys()
                                temp = []
                                for fk in filter_keys:
                                        if fk in attr_keys:
                                                if Feature_mapped[fk] == attr[fk]:
                                                        temp.append(fk)
                                if len(filter_keys) == len(temp):
                                        result.append(restaurant)

                        except:
                                pass

        #list=random.sample(result,100)
        #print(json.dumps(result[:10],indent=4))
        if len(result) > 100:
                list = random.sample(result, 100)
        else:
                list = random.sample(result, len(result))
        return list

# %%
list=get_recommendation_data(Feature_mapped,Business_Restaurant)
print(len(list))
output=json.dumps(list,indent=4)
print(type(output))
 

# %%
