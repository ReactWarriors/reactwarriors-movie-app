import React from "react";
import CallApi from "../../api/api";

export default Component =>
  class MoviesHOC extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        movies: [],
        loading: false
      };
    }

    getMovies = (filters, page) => {

      this.setState({
        loading: true
      });

      const {sort_by, primary_release_year, with_genres} = filters;
      const queryStringParams = {
        language: "ru-RU",
        sort_by,
        page,
        primary_release_year
      };

      if (with_genres.length > 0) {
        queryStringParams.with_genres = with_genres.join(",")
      }

      CallApi.get("/discover/movie", {
        params: queryStringParams
      })
        .then(data => {
          this.setState({
            movies: data.results,
            loading: false
          });
          this.props.onChangeTotalPages(data.total_pages);
        });
    };

    componentDidMount() {
      this.getMovies(this.props.filters, this.props.page);
    }

    componentDidUpdate(prevProps) {
      if (this.props.filters !== prevProps.filters) {
        this.props.onChangePage(1);
        this.getMovies(this.props.filters, 1);
      }

      if (this.props.page !== prevProps.page) {
        this.getMovies(this.props.filters, this.props.page);
      }
    }

    render() {
      const {movies, loading} = this.state;

      return (
        loading
          ? <div className="loader">Loading...</div>
          : <Component movies={movies}/>
      )
    }
  }
