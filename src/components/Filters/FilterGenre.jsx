import React from "react";
import PropTypes from "prop-types";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class FilterGenre extends React.Component {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired
  };

  static genres;

  getGenres = filters => {
    const { onChangeFilters } = filters;
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
    //console.log("year", release_year);
    console.log(link);

    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          genres: data.genres
        });

        //onChangeFilters(data.genres);
      });
  };

  componentDidMount() {
    this.getGenres(this.props);
  }

  render() {
    const { onChangeFilters } = this.props;

    return (
      <div className="form-group">
        <label htmlFor="genre">Жанр:</label>
        <div class="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
            onChange={onChangeFilters}
          ></input>
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            1
          </label>
        </div>

        {/* <select
            id="release_year"
            className="form-control"
            name="release_year"
            value={release_year}
            onChange={onChangeFilters}
          >
          {years}
        </select> */}
      </div>
    );
  }
}
