import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';


class MovieList extends React.Component {
  render() {
    const movieList = this.props.movies;
    return (
      <div className="movie-list">
        { movieList.map((movie) => <MovieCard key={movie.title} movie={movie} />) }
      </div>
    );
  }
}

MovieList.propTypes = { movies: PropTypes.arrayOf({}).isRequired };

export default MovieList;
