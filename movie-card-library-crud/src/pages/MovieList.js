import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.updateState = this.updateState.bind(this);
    this.state = {
      movies: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const fetchedMovieList = await movieAPI.getMovies();
    this.updateState(fetchedMovieList);
  }

  updateState(movies) {
    this.setState({
      movies,
      loading: false,
    });
  }

  render() {
    const { movies, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div data-testid="movie-list" className="movie-list">
        {movies.map((movie) => <MovieCard key={movie.title} movie={movie} />)}
        <div className="movie-card">
          <Link to="movies/new">ADICIONAR CARTÃO</Link>
        </div>
      </div>
    );
  }
}

export default MovieList;
