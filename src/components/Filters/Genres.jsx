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
    const link_genres = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-Ru`;
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

  onChangeGenres = (event) => {
    const {with_genres, onChangeFilters} = this.props;
    const updatedGenres = [...with_genres];

    if(event.target.checked) {
      updatedGenres.push(event.target.value);
    } else {
      let index = updatedGenres.indexOf(event.target.value);
      updatedGenres.splice(index, 1);
    }
    onChangeFilters({
      target: {
        name: "with_genres",
        value: updatedGenres
      }
    })
  };

  componentDidMount() {
    this.getGenres();
  }

  render() {
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
                name="with_genres"
                value={item.id}
                id={item.id}
                onChange={this.onChangeGenres}
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