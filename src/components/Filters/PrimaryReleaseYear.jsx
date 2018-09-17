import React from "react";
import PropTypes from "prop-types";
import UISelect from "../UIComponents/UISelect";
import _ from "lodash";

export default class PrimaryReleaseYear extends React.PureComponent {
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

  // shouldComponentUpdate(nextProps, nextState) {
  //   return _.isEqual(nextProps, this.props) ? false : true;
  // }

  render() {
    const { primary_release_year, onChangeFilters, options } = this.props;
    console.log("PrimaryReleaseYear render");
    return (
      <UISelect
        id="primary_release_year"
        name="primary_release_year"
        value={primary_release_year}
        onChange={onChangeFilters}
        label={LabelText}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </UISelect>
    );
  }
}

const LabelText = () => <p>Год релиза:</p>;
