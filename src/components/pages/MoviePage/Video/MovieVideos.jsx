import React from "react";
import Video from "./Video";
import PropTypes from "prop-types";
import CallApi from "../../../../api/api";
import {withRouter} from "react-router";
import Loader from "../../../UI/Loader/Loader";

class MovieVideos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      loading: true
    }
  }

  componentDidMount() {
    this.getVideos();
  }

  getVideos = () => {
    this.setState({
      loading: true
    });

    CallApi.get(`/movie/${this.props.match.params.id}/videos`)
      .then(data => {
        this.setState({
          videos: data.results,
          loading: false
        })
      });
  };

  render() {

    const {videos, loading} = this.state;
    return (
      loading
        ? <Loader/>
        : <div className="container mx-auto">
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
