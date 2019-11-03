import React from 'react';
import {API_KEY_3, API_URL} from "../../api/api";

export default class Genres extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: []
    }
  }

  getGenres = () => {
    const link_genres = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=en-US`;
    fetch(link_genres)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          genres: data.genres
        });
      })
  };

  componentDidMount() {
    this.getGenres();
  }

  render() {
    const {onChangeFilters} = this.props;
    const {genres} = this.state;

    return (

      <div>
        <h6>Жанры:</h6>
        {genres.map(item => {
          return(
            <div className="form-check" key={item.id}>
              <input
                className="form-check-input"
                type="checkbox"
                name="genres_checked"
                value={item.id}
                id={item.id}
                onChange={onChangeFilters}
              />
              <label className="form-check-label" htmlFor={item.id}>
                {item.name}
              </label>
            </div>
          )
        })}
      </div>
    )
  }
};