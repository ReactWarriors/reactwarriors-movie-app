import React from "react";
import PropTypes from "prop-types";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class FilterGenre extends React.Component {
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
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;

    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
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
    return (
      <div className="form-group">
        <label htmlFor="genre">Жанр:</label>
        {this.state.genres.map(genre => {
          return (
            <div className="form-check form-check" key={genre.id}>
              <input
                className="form-check-input"
                type="checkbox"
                id={genre.id}
                name="genre"
                checked={this.props.with_genres.includes(String(genre.id))}
                value={genre.name}
                onChange={this.onChangeGenre}
              ></input>
              <label className="form-check-label" htmlFor="inlineCheckboxGenre">
                {genre.name}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}
