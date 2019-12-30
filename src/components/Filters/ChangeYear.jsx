import React from "react";
import PropTypes from "prop-types";

export default class ChangeYear extends React.Component {
  static propTypes = {
    release_year: PropTypes.string.isRequired,
    onChangeFilters: PropTypes.func.isRequired
  };
 
  render() {
    const { onChangeFilters, release_year } = this.props;

    let years = [
      <option key={0} value="">
        -
      </option>
    ];
    for (let index = new Date().getUTCFullYear(); index > 1950; index--) {
      years.push(
        <option key={index} value={index}>
          {index}
        </option>
      );
    }

    return (
      <div className="form-group">
          <label htmlFor="release_year">Год выхода:</label>
          <select
            id="release_year"
            className="form-control"
            name="release_year"
            value={release_year}
            onChange={onChangeFilters}
          >
            {years}
          </select>
      </div>
    );
  }
}