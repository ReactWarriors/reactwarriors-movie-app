import React from "react";
import SortBy from "./SortBy";
import ReleaseYear from "./ReleaseYear";
import Pagination from "../Pagination";
import Genres from "./Genres";

export default class Filters extends React.Component {
  render() {
    const {filters: {sort_by, primary_release_year}, page, total_pages, onChangeFilters, onChangePage, onReset} = this.props;
    return (
      <form className="mb-3">
        <SortBy
          sort_by={sort_by}
          onChangeFilters={onChangeFilters}
        />
        <ReleaseYear
          primary_release_year={primary_release_year}
          onChangeFilters={onChangeFilters}
        />
        <Genres
          onChangeFilters={onChangeFilters}
        />
        <p className="mt-3">
          <button
            type="reset"
            className="btn btn-danger btn-block"
            onClick={onReset}
          >Clear filters
          </button>
        </p>
        <Pagination
          page={page}
          total_pages={total_pages}
          onChangePage={onChangePage}
        />
      </form>
    );
  }
}
