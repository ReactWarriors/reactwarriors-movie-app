import React from "react";
import SortBy from './SortBy';
import Genres from "./Genres/Genres";

export default class Filters extends React.Component {
  render() {
    const {
      filters: {sort_by, primary_release_year, with_genres},
      onChangeFilters,
      onResetFilters,
    } = this.props;


    return (
      <form>
        <button
          type="button"
          className="btn btn-primary my-2"
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
      </form>
    );
  }
}
