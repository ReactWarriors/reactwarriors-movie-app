import React from "react";
import {withRouter} from "react-router-dom";
import MovieTabs from "./MovieTabs/MovieTabs";
import MoviePreview from "./MovieMain/MoviePreview";

class MoviePage extends React.Component {
  render() {
    const {match} = this.props;

    return (
      <div className="container pt-1">
        <MoviePreview />
        <MovieTabs movieId={match.params.id}/>
      </div>
    )
  }
}

export default withRouter(MoviePage);
