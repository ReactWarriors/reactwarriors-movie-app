import React from "react";
import SortBy from './SortBy';
import Genres from "./Genres/Genres";
import Pagination from "./Pagination";

export default class Filters extends React.PureComponent {
  render() {
    const {
      filters: {sort_by, primary_release_year, with_genres},
      onChangeFilters,
      onResetFilters,
      page,
      total_pages,
      onChangePage
    } = this.props;


    return (
      <form>
        <button
          type="button"
          className="btn btn-primary my-1"
          onClick={onResetFilters}
        >
          Сбросить
        </button>
        <SortBy
          sort_by={sort_by}
          primary_release_year={primary_release_year}
          onResetFilters={onResetFilters}
          onChangeFilters={onChangeFilters}
        />
        <Genres
          onChangeFilters={onChangeFilters}
          with_genres={with_genres}
        />
        <Pagination
          page={page}
          total_pages={total_pages}
          onChangePage={onChangePage}
        />
      </form>
    );
  }
}
