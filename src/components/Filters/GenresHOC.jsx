import React from "react";
import PropTypes from "prop-types";
//import Genres from "./Genres";
//import { API_URL, API_KEY_3 } from "../../api/api";
import CallApi from "../../api/api";

export default Component =>
  class GenresHOC extends React.Component {
    static propTypes = {
      updateFilters: PropTypes.func.isRequired,
    };

    constructor() {
      super();

      this.state = {
        genres: [],
      };
    }

    componentDidMount() {
      this.getGenres();
    }

    getGenres = () => {
      CallApi.get("/genre/movie/list", {
        params: { language: "ru-RU" },
      }).then(data => {
        this.setState({
          genres: data.genres,
        });
      });
    };

    onChangeGenre = event => {
      const { updateFilters, with_genres } = this.props;

      const { id } = event.target;
      const newGenres = [...with_genres];

      updateFilters(
        "with_genres",
        with_genres.includes(id)
          ? newGenres.filter(genre => genre !== id)
          : [...newGenres, id]
      );
    };

    render() {
      const { with_genres } = this.props;
      const { genres } = this.state;
      const onChangeGenre = this.onChangeGenre;

      //   console.log("Component", Component);

      return (
        <React.Fragment>
          <Component
            genres={genres}
            onChangeGenre={onChangeGenre}
            with_genres={with_genres}
          />
        </React.Fragment>
      );
    }
  };
