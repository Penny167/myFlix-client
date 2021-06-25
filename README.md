# myFlix-client

myFlix-client is the front end of the myFlix application, which is an app for movie enthusiasts that allows them to view information about movies, directors and genres and create lists of their favourite movies.

myFlix-client has been built using React and the build tool Parcel.

MainView is a class component that contains movie data fetched from an API hosted on Heroku after the initial render (using componentDidMount()). The data is passed as props to child class components, MovieCard and MovieView, along with functions to update the MainView state and render those components based on user actions.

When a user logs in successfully they are presented with the MovieCard view containing a list of all movies. When they click on a movie they are presented with the MovieView view showing the details for the movie selected.

There are views to handle logging on to and registering for the app that are also child components of MainView. These are function components that use the React useState hook to handle state changes based on user input into the login and registration forms respectively. The components are passed function props from MainView that change the MainView state when the forms are submitted: submitting a registration form takes the user to the login view; submitting the login form takes the user to the mainview, which contains the fetched list of movies (the MovieCard view).