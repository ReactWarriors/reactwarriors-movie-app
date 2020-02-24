import React from 'react'
import years from '../../data/years'

export default class Year extends React.Component {
  render() {
    const { year, onChangeFilters } = this.props
    return (
      <div className="form-group">
        <label htmlFor="sort_by">Выбрать год выпуска:</label>
        <select
          className="form-control"
          name="year"
          id="year"
          value={year}
          onChange={onChangeFilters}
        >
          <option value="Год выпуска" key="0">
            Год выпуска
          </option>
          {years.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    )
  }
}
