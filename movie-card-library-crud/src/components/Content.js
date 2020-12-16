import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { EditMovie, MovieDetails, MovieList, NewMovie, NotFound } from '../pages/index';

class Content extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route path="/movies/new" component={NewMovie} />
          <Route path="/movies/:id/edit" component={EditMovie} />
          <Route path="/movies/:id" component={MovieDetails} />
          <Route exact path="/" component={MovieList} />
          <Route component={NotFound} />
        </Switch>
      </main>
    );
  }
}

export default Content;
