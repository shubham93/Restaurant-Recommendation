DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS userfeatures;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE restaurants (
  id TEXT PRIMARY KEY UNIQUE,
  business_name TEXT,
  business_address TEXT,
  business_city TEXT,
  business_state TEXT,
  postal_code TEXT,
  stars INTEGER,
  review_count INTEGER,
  attributes TEXT,
  categories TEXT,
  business_hours TEXT
);

CREATE TABLE userfeatures (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  alcohol_present BOOLEAN,
  free_wifi_present BOOLEAN,
  accepts_credit_cards BOOLEAN,
  bike_parking BOOLEAN,
  good_for_kids BOOLEAN,
  restaurant_reservation BOOLEAN,
  outdoor_seating BOOLEAN,
  smoking BOOLEAN,
  coat_check BOOLEAN,
  price_range INTEGER,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user (id)
);