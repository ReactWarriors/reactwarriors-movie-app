import React from "react";
import CallApi from "../../../api/api";

export default class MoviePage extends React.Component {
  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}`);
  }

  render() {
    console.log(this.props);
    return <div>MoviePage</div>;
  }
}
