import React from 'react';

export default class Loader extends React.Component {

  render() {
    const {isLoading} = this.props;
    if(!isLoading) return null;

    return (
      <div className="loader">
        <span>Loading...</span>
      </div>
    )

  }
}