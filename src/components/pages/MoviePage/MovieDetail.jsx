import React from "react";
import MovieContextHOC from "../../HOC/MovieContextHOC";

class MovieDetail extends React.Component {
  render() {

    const {details, genres, production_countries, production_companies, loading} = this.props;

    return (
      <div className="mx-auto">
        {
          loading
            ? <div className="loader">Loading...</div>
            : <table className="table table-bordered mt-4">
          <tbody>
          <tr>
            <th>Статус</th>
            <td>{details.status}</td>
          </tr>
          <tr>
            <th>Дата релиза</th>
            <td>{details.release_date}</td>
          </tr>
          <tr>
            <th>Страна</th>
            <td>{production_countries.map(country => country.name).join(", ")}</td>
          </tr>
          <tr>
            <th>Продолжительность</th>
            <td>{details.runtime} мин.</td>
          </tr>
          <tr>
            <th>Язык оригинала</th>
            <td>{details.original_language}</td>
          </tr>
          <tr>
            <th>Бюджет</th>
            <td>${details.budget}</td>
          </tr>
          <tr>
            <th>Сборы</th>
            <td>${details.revenue}</td>
          </tr>
          <tr>
            <th>Производственные компании</th>
            <td>{production_companies.map(company => company.name).join(", ")}</td>
          </tr>
          <tr>
            <th>Жанры</th>
            <td>{genres.map(genre => genre.name).join(", ")}</td>
          </tr>
          </tbody>
        </table>

        }
      </div>
    )
  }
}

export default MovieContextHOC(MovieDetail);
