import React, { Component } from "react";

class UILabel extends React.PureComponent {
  render() {
    const { id, children } = this.props;
    return <label htmlFor={id}>{children()}</label>;
  }
}

export default UILabel;
