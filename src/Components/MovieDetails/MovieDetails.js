import React, { Component } from "react";
import "./MovieDetails.css";
import { getSelectedMovie, getMovieTrailers } from '../../apiCalls';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: {},
      movieTrailers: [],
      error: ''
    }
  }

  componentDidMount() {
    getSelectedMovie(parseInt(this.props.id))
      .then(selectedMovie => {
        this.setState({movieDetails: selectedMovie.movie})
        this.getTrailers()
      })
      .catch(errorMessage => this.setState({error: errorMessage.toString()}))

    // getMovieTrailers(parseInt(this.props.id))
    //   .then(movieTrailers => this.setState({movieTrailers: movieTrailers}))
    //   .then(() => this.loadMovieTrailers())
    //   .catch(errorMessage => this.setState({error: errorMessage.toString()}))

    // try {
    //   let singleMovie;
    //   let singleMovieTrailers;
    //   await getSelectedMovie(this.props.id)
    //     .then(selectedMovie => {singleMovie = selectedMovie})
    //     .catch(errorMessage => this.setState({error: errorMessage.toString()}))
    //
    // await getMovieTrailers(this.props.id)
    //     .then(movieTrailer => {movieTrailer = singleMovieTrailers})
    //     .catch(errorMessage => this.setState({error: errorMessage.toString()}))
    //
    //   this.setState({movieTrailers: singleMovieTrailers, movieDetails: singleMovie})
    //
    // } catch (error) {
    //   this.setState({error: 'Sorry, we could not find any movies at this time. Refresh and try again!'})
    // }
  }

  getTrailers() {
    getMovieTrailers(parseInt(this.props.id))
    .then(movieTrailers => this.setState({movieTrailers: movieTrailers}))
    .then(() => this.loadMovieTrailers())
    .catch(errorMessage => this.setState({error: errorMessage.toString()}))
  }
  //refactor with try catch blocks and async await
  // try {
    //   const blah = await w/e you call your fetch fn
    //   this.setState({ stuff: more stuff})
    // } catch(error) {
    //   this.setState({ error: 'Whatever you want your message to be' })
    // }

  goBackToMain = () => {
    this.setState({movieDetails: {}})
    this.setState({movieTrailer: []})
  }

  render() {
  let details;

  if(!this.state.movieDetails.id) {
    return <h1>Loading...</h1>
  } else {
    details = (
      <section>
        <section className="macro-container">
          <section tabIndex={0} className="poster">
            <img
              src={this.state.movieDetails.poster_path}
              className="movie-image"
              alt={this.state.movieDetails.title}
            />
          </section>
          <section className="movie-info">
            <section className="go-back-section">
              <Link to="/">
              <button onClick={() => this.goBackToMain()} className="back-button">Go Back</button>
              </Link>
            </section>
            <section className="movie-highlights">
              <h3>{this.state.movieDetails.title.toUpperCase()}</h3>
              <p className="tagline">{this.state.movieDetails.tagline}</p>
              <p>Average Rating: &#11088; {this.state.movieDetails.average_rating.toFixed(1)}</p>
            </section>
            <section className="movie-facts">
              <p id="i">Movie Runtime: {this.state.movieDetails.runtime} mins</p>
              <p id="i">Released: {this.state.movieDetails.release_date}</p>
              <p id="i">Genre: {this.state.movieDetails.genres[0]}</p>
              <img src={this.state.movieDetails.backdrop_path}
                  className="backdrop-image"
                  alt={this.state.movieDetails.title} />
              <p>{this.state.movieDetails.overview}</p>
              <section className="movie-money-info">
              <p>Budget: ${this.state.movieDetails.budget}</p>
              <p>Revenue: ${this.state.movieDetails.revenue}</p>
            </section>
            </section>
          </section>
        </section>
        <section className="movie-trailers">

      </section>
      </section>
    );

    return (
      <section className="movie-detail-view">
         { details }
      </section>
    )
  }
}
}

export default MovieDetails;
