import React from 'react'
import SortBy from './SortBy'
import Pagination from './Pagination'
import PrimaryReleaseYear from './PrimaryReleaseYear'
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
      updateFilters,
    } = this.props
    return (
      <form className="mb-3" action="POST">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters}></SortBy>
        <PrimaryReleaseYear
          primary_release_year={primary_release_year}
          onChangeFilters={onChangeFilters}
        ></PrimaryReleaseYear>
        <Genres
          with_genres={with_genres}
          onChangeFilters={onChangeFilters}
          updateFilters={updateFilters}
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
