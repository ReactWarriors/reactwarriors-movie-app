import React from 'react';
import CheckboxItem from "./CheckboxItem";
import {API_KEY_3, API_URL} from "../../api/api";

class CheckboxList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: [],
      selectedIds: {}
    }
  }

  getGenres = () => {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-Ru`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          genres: data.genres,
          selectedIds: {}
        });
      });
  };

  onChange = event => {
    const {onChangeGenres} = this.props;

    const {id, checked} = event.target;
    const selectedIds = {
      ...this.state.selectedIds,
      [id]: checked
    };

    this.setState({
      selectedIds
    });

    const genresArr = Object.entries(selectedIds)
      .filter(item => item[1])
      .map(item => item[0]);

    onChangeGenres(genresArr);
  };

  componentDidMount() {
    this.getGenres();
  }

  static getDerivedStateFromProps(nextProps) {
    if(nextProps.with_genres.length === 0) {
      return {
        selectedIds: {}
      }
    }
    return null;
  }


  render() {
    const {genres, selectedIds} = this.state;

    return (
      <div className="form-group">
        <div className="mb-2">Жанры:</div>
        <div className="form-check">
          {
            genres.map(genre => {
              return (
                <div key={genre.id}>
                  <CheckboxItem
                    item={genre}
                    checked={selectedIds[genre.id]}
                    onChange={this.onChange}
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
