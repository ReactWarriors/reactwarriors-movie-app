import React from "react";
import SortBy from "./SortBy";
import ChangePage from "./ChangePage";

export default class Filters extends React.Component {
  // static defaultProps = {
  //   years: []
  // };

  render() {
    const {
      filters: { sort_by, release_year },
      page,
      totalPages,
      onChangeFilters,
      onChangePage
    } = this.props;

    let years = [
      <option key={0} value="">
        -
      </option>
    ];
    for (let index = new Date().getUTCFullYear(); index > 1950; index--) {
      years.push(
        <option key={index} value={index}>
          {index}
        </option>
      );
    }

    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />

        <div className="form-group">
          <label htmlFor="release_year">Год выхода:</label>
          <select
            id="release_year"
            className="form-control"
            name="release_year"
            value={release_year}
            onChange={onChangeFilters}
          >
            {years}
          </select>
        </div>

        <ChangePage
          page={page}
          totalPages={totalPages}
          onChangePage={onChangePage}
        />

      </form>
    );
  }
}
