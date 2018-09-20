import React from "react";
import PropTypes from "prop-types";

export default class UISelect extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { id, name, value, onChange, labelText, children } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={id}>{labelText}</label>;
        <select
          id={id}
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
        >
          {children}
        </select>
      </div>
    );
  }
}
