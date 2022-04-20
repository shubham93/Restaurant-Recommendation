# Restaurant-Recommendation

This is the github repo for Group Jackdaw in Adaptive Applications. 

## Frontend

### Prerequisites

Angular Version is 13.

Node version required is 12.22.7 (atleast greater than 12). Use nvm to install https://tecadmin.net/install-nodejs-with-nvm/

Corresponding **npm** should be more than 6.

### How to run

- make sure you are in *angular-frontend* directory
- Execute **npm i** (One time only to install node modules) on command line
- Execute **npm run** on command line

### How to run(React)

- make sure you are in *react-frontend* directory
- Execute **npm install** (One time only to install node modules) on command line
- Execute **npm start** on command line

## Backend

### Prerequisites

Create a separate env to manage all installation. You can do it through conda or follow instructions at https://flask.palletsprojects.com/en/2.0.x/installation/#create-an-environment

Run **pip install -e** to install required packages

Flask version that should be installed is 1.1.2 for python 3.7x or 3.8x

### How to run

For running the backend first time
- run ***export FLASK_APP=flaskr** and ***export FLASK_ENV=development***
- run ***flask init-db*** to initate the db
- run ***flask insert-restaurant*** to insert the data into the database
- run ***flask run***

After firstime:

For Linux and macOs
- navigate to flask-backend and run **source server.sh** 

For Any other OS
- run ***export FLASK_APP=flaskr** and ***export FLASK_ENV=development***
- run ***flask run***





