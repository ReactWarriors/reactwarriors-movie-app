import React from "react";

class MovieDetail extends React.Component {

  render() {
    const {movie} = this.props;

    return (
      <div className="mx-auto">
        <table className="table table-bordered mt-4">
          <tbody>
          <tr>
            <th>Статус</th>
            <td>{movie.status}</td>
          </tr>
          <tr>
            <th>Дата релиза</th>
            <td>{movie.release_date}</td>
          </tr>
          <tr>
            <th>Страна</th>
            <td>{movie.production_countries.map(country => country.name).join(", ")}</td>
          </tr>
          <tr>
            <th>Продолжительность</th>
            <td>{movie.runtime} мин.</td>
          </tr>
          <tr>
            <th>Язык оригинала</th>
            <td>{movie.original_language}</td>
          </tr>
          <tr>
            <th>Бюджет</th>
            <td>${movie.budget}</td>
          </tr>
          <tr>
            <th>Сборы</th>
            <td>${movie.revenue}</td>
          </tr>
          <tr>
            <th>Производственные компании</th>
            <td>{movie.production_companies.map(company => company.name).join(", ")}</td>
          </tr>
          <tr>
            <th>Жанры</th>
            <td>{movie.genres.map(genre => genre.name).join(", ")}</td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default MovieDetail;
