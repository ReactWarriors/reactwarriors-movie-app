import React from "react";
import MovieContextHOC from "../../../HOC/MovieContextHOC";
import VideoItem from "./VideoItem";

class MovieVideos extends React.Component {
  render() {
    const {videos, loading} = this.props;

    return (
      <div className="container mx-auto">
        {
          loading
            ? <div className="loader">Loading...</div>
            : videos.map(video => {
              return (
                <div className="mb-4" key={video.key}>
                  <VideoItem
                    video={video}
                  />
                </div>
              )
            })
        }
      </div>
    )
  }
}

export default MovieContextHOC(MovieVideos);
