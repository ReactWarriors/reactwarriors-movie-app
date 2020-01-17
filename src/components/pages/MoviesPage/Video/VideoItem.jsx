import React from "react";

export default class VideoItem extends React.Component {
  render() {
    const {video} = this.props;

    return (
      <div className="pt-4 mx-auto w-75">
        <h5 className="mb-4">{video.name}</h5>
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            width="640"
            height="360"
            title={video.name}
            className="embed-responsive-item"
            src={`http://www.youtube.com/embed/${video.key}`}
          />
        </div>
      </div>
    )
  }
}
