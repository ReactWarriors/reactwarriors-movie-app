import React from 'react'
import SortBy from './SortBy'
import Pagination from './Pagination'
import Year from './Year'
import Genres from './Genres'

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by, with_genres, primary_release_year },
      page,
      total_pages,
      onChangeFilters,
      onChangePage,
      onReset,
      onGenresUpdate,
    } = this.props
    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters}></SortBy>
        <Year
          primary_release_year={primary_release_year}
          onChangeFilters={onChangeFilters}
        ></Year>
        <Genres
          with_genres={with_genres}
          onChangeFilters={onChangeFilters}
          onGenresUpdate={onGenresUpdate}
        ></Genres>
        <Pagination
          page={page}
          total_pages={total_pages}
          onChangePage={onChangePage}
          onReset={onReset}
        ></Pagination>
      </form>
    )
  }
}
