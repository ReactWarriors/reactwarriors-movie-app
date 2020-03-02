import React from 'react'
import { API_URL, API_KEY_3 } from '../../api/api'

export default class Genres extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      genres: [],
    }
  }

  getGenres = () => {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`
    fetch(link)
      .then(response => response.json())
      .then(data => {
        this.setState({
          genres: data.genres,
        })
      })
  }

  onChangeGenres = e => {
    const { checked, id } = e.target
    this.props.updateFilters({
      name: 'with_genres',
      value: checked
        ? [...this.props.with_genres, Number(id)]
        : this.props.with_genres.filter(genre => genre !== Number(id)),
    })
  }

  componentDidMount() {
    this.getGenres()
  }

  render() {
    const { genres } = this.state
    const { with_genres } = this.props
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
                onChange={this.onChangeGenres}
                checked={with_genres.includes(Number(genre.id))}
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
