import React from "react";

export default class Filters extends React.Component {
  render() {
    return (
      <form className="mb-3">
        <div className="form-group">
          <label htmlFor="sort_by">Сортировать по:</label>
          <select className="form-control" id="sort_by">
            <option value="popularity.desc">Популярные по убыванию</option>
            <option value="popularity.asc">Популярные по возростанию</option>
            <option value="vote_average.desc">Рейтинг по убыванию</option>
            <option value="vote_average.asc">Рейтинг по возростанию</option>
          </select>
        </div>
      </form>
    );
  }
}
