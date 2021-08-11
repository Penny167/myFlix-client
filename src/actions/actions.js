export const SET_MOVIES = 'SET_MOVIES';
export const FILTER_MOVIES = 'FILTER_MOVIES';
export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_FAVOURITES = 'UPDATE_FAVOURITES';

// movies is the movies array returned from the database as a response to the axios GET request
 export const setMovies = (movies) => {
  return {
    type: SET_MOVIES,
    movies: movies
  }  
}

// filterstring is a search string that will contain details of whatever we want to view from the movies array eg movie title, director, genre
export const filterMovies = (filterstring) => {
  return {
    type: FILTER_MOVIES,
    filterstring: filterstring
  }
}

// user is the user returned from the database following a successful login request
export const setUser = (user) => {
  return {
    type: SET_USER,
    user: user
  }
}

// user is the user returned from the database following a successful update request
export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user: user
  }
}

/* favourites is the updated favourites array returned from the database following a successful put or 
delete request: in each case the new array will be sent to the store to update the user state */
export const updateFavourites = (favourites) => {
  return {
    type: UPDATE_FAVOURITES,
    favourites: favourites
  }
}