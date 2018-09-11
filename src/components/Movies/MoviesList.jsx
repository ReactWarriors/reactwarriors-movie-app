import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }

  getMovies = filters => {
    const { sort_by } = filters;
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        });
      });
  };

  componentDidMount() {
    // const sort_by = this.props.filters.sort_by
    // const {
    //   filters: { sort_by }
    // } = this.props;
    // const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}`;
    // fetch(link)
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     this.setState({
    //       movies: data.results
    //     });
    //   });
    this.getMovies(this.props.filters);
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("props", this.props, "nextProps", nextProps);
  //   if (nextProps.filters.sort_by !== this.props.filters.sort_by) {
  //     // const {
  //     //   filters: { sort_by }
  //     // } = nextProps;
  //     // const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}`;
  //     // fetch(link)
  //     //   .then(response => {
  //     //     return response.json();
  //     //   })
  //     //   .then(data => {
  //     //     this.setState({
  //     //       movies: data.results
  //     //     });
  //     //   });
  //     this.getMovies(nextProps.filters);
  //   }
  // }

  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate", prevProps);
    if (this.props.filters.sort_by !== prevProps.filters.sort_by) {
      this.getMovies(this.props.filters);
    }
  }

  render() {
    const { movies } = this.state;
    // console.log("filters", this.props.filters);
    console.log("render");
    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}
