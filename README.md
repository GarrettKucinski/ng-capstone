# Angular 4 Yelp Local Recommendations App with Twitter Authentication 

An app that allows a user to log in with their Twitter credentials and receive custom Yelp recommendations for their areas 50 top rated food places. The user can also select a detailed view which displays some specific information about the location.

View this repo online at [treehouse-capstone.herokuapp.com](treehouse-capstone.herokuapp.com)

## Technology 
- NodeJS
- ExpressJS
- superagent
- REST
- CSS
- MongoDB
- Mongoose 
- Angular 5
- Twitter API
- Google Maps API
- Yelp Fusion API

## To run the project

To install dependencies: 

run `yarn` inside the root and client folders

Once that completes run the following in the root of the project.
```
npm run dev 
```

These environment variables will need to be set to successfully run the project:
```
YELP_ACCESS_TOKEN

TWITTER_ACCESS_TOKEN
TWITTER_ACCESS_TOKEN_SECRET
TWITTER_CONSUMER_KEY
TWITTER_CONSUMER_SECRET
MONGODB_URI
```

This variable can be any string you like:
```
SECRET```

after all that and the app is running point your browser to localhost:4200!
