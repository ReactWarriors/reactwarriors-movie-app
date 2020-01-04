import React from "react";
import SortBy from "./SortBy";
import FilterPage from "./FilterPage";
import FilterYear from "./FilterYear";
import FilterGenre from "./FilterGenre";

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
      onChangeGenre,
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

        <FilterYear
          release_year={release_year}
          onChangeFilters={onChangeFilters}
        />

        <FilterPage
          page={page}
          totalPages={totalPages}
          onChangePage={onChangePage}
        />

        <FilterGenre onChangeGenre={onChangeGenre} />

        <button type="button" className="btn btn-light" onClick={clearFilters}>
          Сбросить фильтры
        </button>
      </form>
    );
  }
}
