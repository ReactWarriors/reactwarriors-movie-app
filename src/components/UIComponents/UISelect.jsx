import React from "react";
import PropTypes from "prop-types";
import UILabel from "./UILabel";
import _ from "lodash";

export default class UISelect extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   // if (_.isEqual(nextProps, this.props)) {
  //   //   return false
  //   // } else {
  //   //   return true
  //   // }
  //   console.log(nextProps, this.props);
  //   return _.isEqual(nextProps, this.props) ? false : true;
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("this.props", this.props);
  //   console.log("nextProps", nextProps);
  //   if (
  //     nextProps.value !== this.props.value ||
  //     nextProps.id !== this.props.id
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    const { id, name, value, onChange, label } = this.props;
    // console.log("UISelect render");
    console.log(typeof this.props.children);
    console.log(this.props.children);
    return (
      <div className="form-group">
        <UILabel id={id}>{label}</UILabel>
        <select
          id={id}
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
        >
          {this.props.children}
        </select>
      </div>
    );
  }
}
