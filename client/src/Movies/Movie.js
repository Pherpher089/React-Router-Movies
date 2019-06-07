import React, { Component } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard'

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.fetchMovie(id);
  }  

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        this.setState(() => ({ movie: response.data }));
      })
      .catch(error => {
        console.error(error);
      });
  };
  // Uncomment this code when you're ready for the stretch problems
  // componentWillReceiveProps(newProps){
  //   if(this.props.match.params.id !== newProps.match.params.id){
  //     this.fetchMovie(newProps.match.params.id);
  //   }
  // }

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  }

  render() {
    console.log('Movie has rendered');
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    if(this.state.movie.id !==  this.props.match.params.id)
    {
      this.fetchMovie(this.props.match.params.id);
    }

    return (
      <MovieCard movie={this.state.movie} saveMovie={this.saveMovie}/>
    );
  }
}
