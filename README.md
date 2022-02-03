# myFlix-client 🎬

myFlix-client is a responsive front end for a movie application that allows movie enthusiasts to view information about movies, directors and genres for a selection of classic films. 

The app interacts with a database that holds movie and user information using the myFlix API. The repository for the API, which includes documentation of all the available endpoints, can be found [here](https://github.com/Penny167/myFlix).

my-Flix-client was built using React, uses the build tool Parcel and is hosted on Netlify.

## Live website

Visit myFlix-client [here]() and sign up to explore the app!

## Key Features

- Users can log in or sign up to the app from a welcome page. Login and registration forms implement HTML form validation to ensure credentials adhere to the database users schema.
- On logging in users are taken to a movie view where they can view all the movies in the database. Movies are displayed as cards showing an image, the title, the first lines of a synopsis and a button that the user can click to see additional details. The movie view also contains a search bar that implements a filter whereby users can search for specific movies of interest.
- Clicking a movie card button takes the user to a view of the individual movie. They can read a full synopsis and find information about the director and genre. Clickable links take them to director and genre views with further details. A button allows the user to add the movie to a list of their favourites, which they can view on their profile page.
- Back buttons and links allow the user to move between views. There is also a navigation bar via which a user can navigate directly to the movie view, to their profile or log out.
- The user's profile displays their registration credentials as well as the list of their favourite movies. They can update their credentials via an update form, remove movies from their list of favourites or deregister from the app entirely from this view.
- Both class based and function components are used to demonstrate different ways of working with state, hooks and lifecycle methods.
- Redux and React-Redux are implemented to manage shared state via a store using actions and reducers. 
- myFlix-client is styled using React-Bootstrap to provide a responsive layout as well as a variety of components such as forms, cards, toast alerts and a navbar.
- HTTP requests to send and receive data to and from the database via the myFlix API endpoints are made using Axios.
- Prop-types ensure props are passed between components correctly.
- The completed app has been published to Netlify and is accessible via the live website link above.

## Technologies used

- React
- React-Bootstrap
- React-Redux
- Redux
- Axios
- Prop-types
- Parcel

## Installation and set up

UPDATE THIS SECTION ONCE DEPLOYMENT COMPLETED

To install myFlix-client run: 
```
npm install
```

To launch myFlix-client locally run:
```
parcel src/index.html
```

## Author
Github: [@penny167](https://github.com/Penny167)