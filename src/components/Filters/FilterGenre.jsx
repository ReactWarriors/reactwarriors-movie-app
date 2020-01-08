import React from "react";
import PropTypes from "prop-types";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class FilterGenre extends React.Component {
  static propTypes = {
    сhangeFiltersState: PropTypes.func.isRequired
  };

  getGenres = () => {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
    //console.log(link);

    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          genres: data.genres
        });
      });
  };

  onChangeGenre = event => {
    const { сhangeFiltersState } = this.props;

    const { id } = event.target;
    const newGenres = [...this.props.genres];

    if (this.props.genres.includes(id)) {
      newGenres.splice(newGenres.indexOf(id), 1);
    } else {
      newGenres.push(id);
    }
    сhangeFiltersState("genres", newGenres);

  };

  componentDidMount() {
    this.getGenres(this.props);
  }

  render() {
 
    let genresCheckBoxes = "";
    if (this.state) {
      genresCheckBoxes = this.state.genres.map(genre => {
        return (
          <div className="form-check form-check" key={genre.id}>
            <input
              className="form-check-input"
              type="checkbox"
              id={genre.id}
              name="genre"
              checked={this.props.genres.includes(genre.id.toString())}
              value={genre.name}
              onChange={this.onChangeGenre}
              //onClick={(event) => this.handleClick(event.target.name, event.target.value)}
            ></input>
            <label className="form-check-label" htmlFor="inlineCheckboxGenre">
              {genre.name}
            </label>
          </div>
        );
      });
    }

    return (
      <div className="form-group">
        <label htmlFor="genre">Жанр:</label>
        {genresCheckBoxes}
      </div>
    );
  }
}
