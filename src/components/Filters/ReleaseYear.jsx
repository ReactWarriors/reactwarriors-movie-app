import React from 'react';
import PropTypes from 'prop-types';

export default class ReleaseYear extends React.Component {

  getYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for(let i = 0; i < 10; i++) {
      years.push(currentYear - i);
    }
    return years;
  };

  render() {
    const {primary_release_year, onChangeFilters} = this.props;

    return (
      <div className="form-group">
        <label htmlFor="primary_release_year">Год выпуска:</label>
        <select
          className="form-control"
          id="primary_release_year"
          name="primary_release_year"
          value={primary_release_year}
          onChange={onChangeFilters}
        >
          {this.getYears().map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    )
  }
}

ReleaseYear.propTypes = {
  onChangeFilters: PropTypes.func.isRequired
};