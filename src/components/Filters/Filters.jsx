import React from "react";
import SortBy from "./SortBy";
import ChangePage from "./ChangePage";
import ChangeYear from "./ChangeYear";

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
      onChangePage,
      clearFilters
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

        <ChangeYear
          release_year={release_year}
          onChangeFilters={onChangeFilters}
        />

        <ChangePage
          page={page}
          totalPages={totalPages}
          onChangePage={onChangePage}
        />

        <button type="button" className="btn btn-light" onClick={clearFilters}>
          Сбросить фильтры
        </button>

      </form>
    );
  }
}
