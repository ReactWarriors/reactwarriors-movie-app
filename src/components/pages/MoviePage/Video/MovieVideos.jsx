import React from "react";
import VideoItem from "./VideoItem";
import CallApi from "../../../../api/api";

class MovieVideos extends React.Component {
  constructor() {
    super();
    this.state = {
      videos: []
    }
  }

  componentDidMount() {
    this.getVideos();
  }

  getVideos = () => {
    const queryStringParams = {
      language: "ru-Ru",
    };

    CallApi.get(`/movie/${this.props.movieId}/videos`, {
      params: queryStringParams
    })
      .then(data => {
        this.setState({
          videos: data.results,
        })
      });
  };

  render() {
    const {videos} = this.state;
    return (
      <div className="container mx-auto">
        {
          videos.map(video => {
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

export default MovieVideos;
