import React from 'react';
import GenreItem from "./GenreItem";
import {API_KEY_3, API_URL} from "../../../api/api";

class CheckboxList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: [],
    }
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

  componentDidMount() {
    this.getGenres();
  }

  render() {
    const {genres} = this.state;
    const {with_genres} = this.props;

    return (
      <div className="form-group">
        <div className="mb-2">Жанры:</div>
        <div className="form-check">
          {
            genres.map(genre => {
              return (
                <div key={genre.id}>
                  <GenreItem
                    item={genre}
                    checked={with_genres.includes(genre.id.toString())}
                    onChange={this.onChangeGenres}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default CheckboxList;
