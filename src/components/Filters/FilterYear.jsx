import React from "react";
import PropTypes from "prop-types";

const getYears = () => {
  const years = [
    {
      value: "",
      label: "Выберите год"
    }
  ];

  for (let index = new Date().getUTCFullYear(); index > 1950; index--) {
    years.push({
      value: index,
      label: index
    });
  }

  return years;
};

const years = getYears();

export default class FilterYear extends React.Component {
  static propTypes = {
    release_year: PropTypes.string.isRequired,
    onChangeFilters: PropTypes.func.isRequired
  };

  render() {
    const { onChangeFilters, release_year } = this.props;

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
          {years.map((year, index) => (
            <option key={index} value={year.value}>
              {year.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
