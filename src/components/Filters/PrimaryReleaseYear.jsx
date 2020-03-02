import React from 'react'

const getYears = () =>
  Array.from(new Array(70), (_, index) => new Date().getFullYear() - index)

export default class PrimaryReleaseYear extends React.PureComponent {
  static defaultProps = {
    years: getYears(),
  }

  render() {
    const { primary_release_year, onChangeFilters, years } = this.props
    return (
      <div className="form-group">
        <label htmlFor="sort_by">Выбрать год выпуска:</label>
        <select
          className="form-control"
          name="primary_release_year"
          id="primary_release_year"
          value={primary_release_year}
          onChange={onChangeFilters}
        >
          <option value="" key="0">
            Год выпуска
          </option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    )
  }
}
