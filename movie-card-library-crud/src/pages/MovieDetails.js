import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();

    this.updateState = this.updateState.bind(this);
    this.handleMovieDelete = this.handleMovieDelete.bind(this);
    this.state = {
      loading: true,
      movie: {},
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const fetchedMovie = await movieAPI.getMovie(id);
    this.updateState(fetchedMovie);
  }

  updateState(movie) {
    this.setState({
      movie,
      loading: false,
    });
  }

  handleMovieDelete() {
    const { id } = this.props.match.params;
    movieAPI.deleteMovie(id);
  }

  render() {
    const { handleMovieDelete } = this;
    const { id } = this.props.match.params;
    const { loading } = this.state;
    const { title, storyline, imagePath, genre, rating, subtitle } = this.state.movie;

    return (
      (loading)
        ? <Loading />
        : <div data-testid="movie-details">
          <img alt="Movie Cover" src={`../${imagePath}`} />
          <p>{`Title: ${title}`}</p>
          <p>{`Subtitle: ${subtitle}`}</p>
          <p>{`Storyline: ${storyline}`}</p>
          <p>{`Genre: ${genre}`}</p>
          <p>{`Rating: ${rating}`}</p>
          <Link to={`/movies/${id}/edit`}>EDITAR</Link>
          <Link to="/">VOLTAR</Link>
          <Link onClick={handleMovieDelete} to="/">DELETAR</Link>
        </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MovieDetails;
