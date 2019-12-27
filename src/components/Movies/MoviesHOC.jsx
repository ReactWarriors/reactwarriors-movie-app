import React from "react";
import CallApi from "../../api/api";

export default Component =>
  class MoviesHOC extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        movies: [],
        loading: false,
        favorites: new Set(),
        watchlist: new Set()
      };
    }

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

      if (this.props.session_id !== prevProps.session_id) {
        this.getFavorites();
        this.getWatchlist();
      }
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

    changeFavorite = (id, isFavorite) => {
      const {session_id, toggleModal} = this.props;

      if (session_id) {
        CallApi.post(`/account/${session_id}/favorite`, {
          params: {
            session_id: session_id
          },
          body: {
            media_type: "movie",
            media_id: id,
            favorite: isFavorite
          }
        })
          .then(() => {
            return this.getFavorites();
          })
      } else {
        toggleModal();
      }
    };

    changeWatchlist = (id, isWatchlist) => {
      const {session_id, toggleModal} = this.props;

      if (session_id) {
        CallApi.post(`/account/${session_id}/watchlist`, {
          params: {
            session_id: session_id
          },
          body: {
            media_type: "movie",
            media_id: id,
            watchlist: isWatchlist
          }
        })
          .then(() => {
            return this.getWatchlist();
          })
      } else {
        toggleModal();
      }
    };

    getWatchlist = () => {
      const {session_id} = this.props;

      if (session_id) {
        return CallApi.get(`/account/${session_id}/watchlist/movies`, {
          params: {
            session_id
          }
        })
          .then(data => {
            this.setState({
              watchlist: new Set(data.results.map(elem => elem.id))
            })
          })
          .catch(() => {
            this.setState({
              watchlist: new Set()
            })
          })
      }
      return Promise.resolve();
    };

    getFavorites = () => {
      const {session_id} = this.props;

      if (session_id) {
        return CallApi.get(`/account/${session_id}/favorite/movies`, {
          params: {
            session_id
          }
        })
          .then(data => {
            this.setState({
              favorites: new Set(data.results.map(elem => elem.id))
            })
          })
          .catch(() => {
            this.setState({
              watchlist: new Set()
            })
          })
      }
      return Promise.resolve();
    };

    render() {
      const {movies, loading, favorites, watchlist} = this.state;


      return (
        loading
          ? <div className="loader">Loading...</div>
          : <Component
            movies={movies}
            favorites={favorites}
            watchlist={watchlist}
            changeFavorite={this.changeFavorite}
            changeWatchlist={this.changeWatchlist}
            {...this.props}
          />
      )
    }
  }
