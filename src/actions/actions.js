export const SET_MOVIES = 'SET_MOVIES';
export const FILTER_MOVIES = 'FILTER_MOVIES';

 export const setMovies = (movies) => {
  return {
    type: SET_MOVIES,
    movies: movies
  }  
}

export const filterMovies = (filterstring) => {
  return {
    type: FILTER_MOVIES,
    filterstring: filterstring
  }
}

