import React from "react";
import PropTypes from "prop-types";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class FilterGenre extends React.Component {
  static propTypes = {
    onChangeGenre: PropTypes.func.isRequired
  };

  //static genres;

  getGenres = filters => {
    //const { onChangeFilters } = filters;
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

        this.genres = data.genres;
        //console.log("genres1", this.genres);
        //onChangeFilters(data.genres);
      });
  };

  componentDidMount() {
    this.getGenres(this.props);
    //console.log("genres2", this.genres);
  }

  render() {
    const { onChangeGenre } = this.props;

    let genresCheckBoxes = "";
    if (this.state) {
      genresCheckBoxes = this.state.genres.map(genre => {
        return <div className="form-check form-check" key={genre.id}>
          <input
            className="form-check-input"
            type="checkbox"
            id={genre.id}
            name="genre"
            //checked={false}
            value={genre.name}
            onChange={onChangeGenre}
          ></input>
          <label className="form-check-label" htmlFor="inlineCheckboxGenre">
            {genre.name}
          </label>
        </div>;
      });
    }

    //console.log("genresCheckBoxes", genresCheckBoxes);

    return (
      <div className="form-group">
        <label htmlFor="genre">Жанр:</label>
        {genresCheckBoxes}        
      </div>
    );
  }
}
