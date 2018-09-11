import React from "react";

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by },
      onChangeFilters
    } = this.props;
    return (
      <form className="mb-3">
        <div className="form-group">
          <label htmlFor="sort_by">Сортировать по:</label>
          <select
            id="sort_by"
            className="form-control"
            name="sort_by"
            value={sort_by}
            onChange={onChangeFilters}
          >
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
