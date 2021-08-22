// import the actions that will be arguments to the reducer functions
import { SET_MOVIES, FILTER_MOVIES, SET_USER, UPDATE_USER, UPDATE_FAVOURITES } from "../actions/actions";

/* import the combineReducers component from the redux library so we can write individual reducers
for each piece of state then combine them within one overall 'root reducer' for the app */
import { combineReducers } from "redux";

// reducer to update movies state when SET_MOVIES action dispatched
const moviesReducer = (state=[], action) => {
  switch(action.type) {
    case SET_MOVIES: {
      return action.payload
    }
    default: return state  
  }
}
// reducer to set filter when FILTER_MOVIES action dispatched
const filterReducer = (state='', action) => {
  switch(action.type) {
    case FILTER_MOVIES: {
      return action.payload
    }
    default: return state
  }
}
// reducer to update user state when one of the related actions is dispatched
const userReducer = (state=null, action) => {
  switch(action.type) {
    case SET_USER: {
      return action.payload
    }
    case UPDATE_USER: {
      return action.payload
    }
    case UPDATE_FAVOURITES: {
      return {
        ...state,
        FavouriteMovies: action.payload
      }
    }
    default: return state
  }
}

// combined reducer to handle state updates for the whole application 
const appReducer = combineReducers({
  movies: moviesReducer,
  movieFilter: filterReducer,
  user: userReducer
})

export default appReducer;