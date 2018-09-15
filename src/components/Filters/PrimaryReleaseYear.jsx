import React from "react";
import PropTypes from "prop-types";

export default class PrimaryReleaseYear extends React.Component {
  static propTypes = {
    primary_release_year: PropTypes.string.isRequired,
    onChangeFilters: PropTypes.func.isRequired
  };

  static defaultProps = {
    options: [
      {
        label: "2018",
        value: "2018"
      },
      {
        label: "2017",
        value: "2017"
      },
      {
        label: "2016",
        value: "2016"
      },
      {
        label: "2015",
        value: "2015"
      }
    ]
  };

  render() {
    const { primary_release_year, onChangeFilters, options } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="primary_release_year">Год релиза:</label>
        <select
          id="primary_release_year"
          className="form-control"
          name="primary_release_year"
          value={primary_release_year}
          onChange={onChangeFilters}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
