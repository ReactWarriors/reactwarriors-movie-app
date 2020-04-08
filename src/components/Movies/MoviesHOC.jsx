import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import CallApi from "../../api/api";

export default Component =>
  class MoviesHOC extends React.Component {
    static propTypes = {
      onChangeTotalPages: PropTypes.func.isRequired,
    };

    constructor() {
      super();

      this.state = {
        loaded: false,
        movies: [],
        totalPages: 1,
      };
    }

    getMovies = filters => {
      const { sort_by, release_year, with_genres, page } = filters;
      const queryStringParams = {
        language: "ru-RU",
        sort_by,
        page,
      };

      if (with_genres.length > 0) {
        queryStringParams.with_genres = with_genres.join();
      }
      if (release_year) {
        queryStringParams.primary_release_year = release_year;
      }

      // const oldLink =
      //   `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}` +
      //   (release_year ? `&primary_release_year=${release_year}` : "") +
      //   (with_genres.length > 0 ? `&with_genres=${with_genres.join()}` : "");

      CallApi.get("/discover/movie", {
        params: queryStringParams,
      }).then(data => {
        this.setState({
          movies: data.results,
          loaded: true,
          page: data.page,
          totalPages: data.total_pages,
        });
        this.props.onChangeTotalPages(data.total_pages);
      });
    };

    componentDidMount() {
      this.getMovies(this.props.filters);
    }

    componentDidUpdate(prevProps) {
      if (!_.isEqual(this.props.filters, prevProps.filters)) {
        this.setState({ loaded: false });
        this.getMovies(this.props.filters, this.props.onChangeTotalPages);
      }
    }

    render() {
      const { movies, loaded } = this.state;
      
      //  console.log("this.props", this.props);

      return (
        <Component
          //user={user}
          movies={movies}
          loaded={loaded}
          favorite={this.props.favorite}
          watchlist={this.props.watchlist}
          toggleFavorite={this.props.toggleFavorite}
          toggleWatchlist={this.props.toggleWatchlist}
        />
      );
    }
  };
