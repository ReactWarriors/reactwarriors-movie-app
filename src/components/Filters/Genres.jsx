import React from 'react'
import { API_URL, API_KEY_3 } from '../../api/api'

export default class Genres extends React.Component {
  constructor() {
    super()

    this.state = {
      genres: [],
    }
  }

  getGenres = () => {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`
    fetch(link)
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({
          genres: data.genres,
        })
      })
  }

  componentDidMount() {
    // console.log('componentDidMount')
    this.getGenres()
  }

  render() {
    const { genre, onChangeFilters } = this.props
    console.log(genre)
    const { genres } = this.state
    return (
      <div className="form-group">
        {genres.map(genre => {
          return (
            <div className="form-check" key={genre.id}>
              <input
                className="form-check-input"
                type="checkbox"
                value={genre.name}
                id={genre.id}
                name="with_genres"
                onChange={onChangeFilters}
              ></input>
              <label className="form-check-label" htmlFor={genre.id}>
                {genre.name}
              </label>
            </div>
          )
        })}
      </div>
    )
  }
}

// <div key={genre.id}>
// <p>{genre.name}</p>
// </div>
