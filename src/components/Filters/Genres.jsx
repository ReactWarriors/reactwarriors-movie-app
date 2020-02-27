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
          genres: data.genres.map(genre => {
            return { ...genre, isChecked: false }
          }),
        })
      })
  }

  onChangeGenres = e => {
    const genres = [...this.state.genres]
    genres.forEach(genre => {
      if (Number(genre.id) === Number(e.target.id)) {
        genre.isChecked = !genre.isChecked
        this.collectSelectedGenres(genre.id)
      }
    })
    this.setState({ genres })
  }

  collectSelectedGenres = id => {
    const genresId = [...this.props.with_genres]
    if (genresId.indexOf(id) === -1) {
      genresId.push(id)
    } else {
      genresId.splice(genresId.indexOf(id), 1)
    }

    this.props.onGenresUpdate(genresId)
  }

  // Почему это работает????
  resetAllGenres = () => {
    const genres = [...this.state.genres]
    genres.forEach(genre => {
      genre.isChecked = false
    })
  }

  componentDidMount() {
    this.getGenres()
  }

  componentDidUpdate() {
    if (this.props.with_genres.length === 0) {
      this.resetAllGenres()
    }
  }

  render() {
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
                onChange={this.onChangeGenres}
                checked={genre.isChecked}
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
