import React from "react";
import MovieContextHOC from "../../../HOC/MovieContextHOC";
import PersonaltItem from "./PersonaltItem";

class MovieCredits extends React.Component {
  render() {
    const {cast, loading} = this.props;

    return (
      <div className="row">
        <div className="card-deck mx-auto">
          {
            loading
            ? <div className="loader">Loading...</div>
            : cast.map(actor => {
              return (
                <div key={actor.id} className="col-2 mb-4">
                  <PersonaltItem
                    actor={actor}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default MovieContextHOC(MovieCredits);
