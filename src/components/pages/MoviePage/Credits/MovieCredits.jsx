import React from "react";
import Actor from "./Actor";
import CallApi from "../../../../api/api";
import PropTypes from "prop-types";


class MovieCredits extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cast: []
    }
  }

  componentDidMount() {
    this.getCredits();
  }

  getCredits = () => {
    const queryStringParams = {
      language: "ru-Ru",
    };

    CallApi.get(`/movie/${this.props.match.params.id}/credits`, {
      params: queryStringParams
    })
      .then(data => {
        this.setState({
          cast: data.cast
        })
      });
  };

  render() {
    const {cast} = this.state;

    return (
        <div className="row">
          <div className="card-deck mx-auto">
            {
              cast.map(actor => {
                return (
                  <div key={actor.id} className="col-2 mb-4">
                    <Actor
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

MovieCredits.propTypes = {
  cast: PropTypes.array
};

export default MovieCredits;
