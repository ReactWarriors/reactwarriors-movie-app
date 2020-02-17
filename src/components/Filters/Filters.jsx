import React from "react";
import SortBy from "./SortBy";
import FilterPage from "./FilterPage";
import FilterYear from "./FilterYear";
// import GenresContainer from "./GenresContainer";
import Genres from "./Genres";

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by, release_year, page, with_genres },
      totalPages,
      onChangeFilters,
      updateFilters,
      clearFilters,
    } = this.props;

    return (
      <form className="mb-3">
        <SortBy
          sort_by={sort_by}
          onChangeFilters={onChangeFilters}
          //updateFilters={updateFilters}
        />

        <FilterYear
          release_year={release_year}
          onChangeFilters={onChangeFilters}
        />

        <FilterPage
          page={page}
          totalPages={totalPages}
          updateFilters={updateFilters}
        />

        <Genres with_genres={with_genres} updateFilters={updateFilters} />

        <button type="button" className="btn btn-light" onClick={clearFilters}>
          Сбросить фильтры
        </button>
      </form>
    );
  }
}
