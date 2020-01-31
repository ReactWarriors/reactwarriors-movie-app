import React from "react";
import Image from "../../../UI/Image";

export default class Actor extends React.Component {
  render() {
    const {actor} = this.props;
    return (
      <div className="card mt-4">
        <Image
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
          alt="actor"
        />
        <div className="card-body p-2">
          <h6 className="card-title mb-1">{actor.name}</h6>
          <small className="text-muted">{actor.character}</small>
        </div>
      </div>
    )
  }
}
