import React from "react";
import Video from "./Video";
import PropTypes from "prop-types";
import CallApi from "../../../../api/api";
import {withRouter} from "react-router";

class MovieVideos extends React.Component {
  constructor(props) {
    super(props);
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
    CallApi.get(`/movie/${this.props.match.params.id}/videos`, {
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
                <Video
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

MovieVideos.propTypes = {
  videos: PropTypes.array
};



export default withRouter(MovieVideos);
