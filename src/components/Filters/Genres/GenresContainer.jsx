import React from "react";
import Genres from "./Genres";
import {API_KEY_3, API_URL} from "../../../api/api";

class GenresContainer extends React.Component {
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
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-Ru`;
    fetch(link)
      .then(response => response.json())
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
          <Genres
            genres={genres}
            with_genres={with_genres}
            onChangeGenres={this.onChangeGenres}
          />
        </div>
      </div>
    )
  }
}

export default GenresContainer;
