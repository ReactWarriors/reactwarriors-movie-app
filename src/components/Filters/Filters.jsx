import React from "react";
import SortBy from './SortBy';
import CheckboxList from "./CheckboxList";

export default class Filters extends React.Component {
  render() {
    const {
      filters: {sort_by, primary_release_year, with_genres},
      onChangeFilters,
      onResetFilters,
      onChangeGenres
    } = this.props;

    return (
      <form>
        <SortBy
          sort_by={sort_by}
          primary_release_year={primary_release_year}
          onResetFilters={onResetFilters}
          onChangeFilters={onChangeFilters}
        />
        <CheckboxList
          onChangeGenres={onChangeGenres}
          with_genres={with_genres}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={onResetFilters}
        >
          Сбросить
        </button>
      </form>
    );
  }
}
