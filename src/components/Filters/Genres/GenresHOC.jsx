import React from "react";
import CallApi from "../../../api/api";

export default Component =>
  class GenresHOC extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        genres: [],
      }
    }

    componentDidMount() {
      this.getGenres();
    }

    getGenres = () => {

      CallApi.get("/genre/movie/list", {
        params: {
          language: "ru-RU"
        }
      })
        .then(data => {
          this.setState({
            genres: data.genres,
          });
        });
    };

    onChangeGenres = event => {
      const {onChangeFilters, with_genres} = this.props;
      const {value, checked} = event.target;

      onChangeFilters({
        target: {
          name: "with_genres",
          value: checked ? [value, ...with_genres] : with_genres.filter(genre => genre !== value)
        }
      })
    };

    render() {
      const {genres} = this.state;
      const {with_genres} = this.props;

      return (
        <div className="form-group mb-1">
          <div className="mb-2">Жанры:</div>
          <div className="form-check">
            <Component
              genres={genres}
              with_genres={with_genres}
              onChangeGenres={this.onChangeGenres}
            />
          </div>
        </div>
      )
    }
  };
