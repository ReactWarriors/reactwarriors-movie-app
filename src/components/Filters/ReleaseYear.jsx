import React from 'react';
import PropTypes from 'prop-types';

export default class ReleaseYear extends React.Component {

  render() {
    const {primary_release_year, onChangeFilters, options} = this.props;

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
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    )
  }
}

ReleaseYear.defaultProps = {
  options: [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2000]
};

ReleaseYear.propTypes = {
  primary_release_year: PropTypes.string.isRequired,
  onChangeFilters: PropTypes.func.isRequired
};