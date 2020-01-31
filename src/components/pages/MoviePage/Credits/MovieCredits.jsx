import React from "react";
import Actor from "./Actor";
import CallApi from "../../../../api/api";
import PropTypes from "prop-types";
import Loader from "../../../UI/Loader/Loader";


class MovieCredits extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cast: [],
      loading: true
    }
  }

  componentDidMount() {
    this.getCredits();
  }

  getCredits = () => {
    this.setState({
      loading: true
    });

    CallApi.get(`/movie/${this.props.match.params.id}/credits`)
      .then(data => {
        this.setState({
          cast: data.cast,
          loading: false
        })
      });
  };

  render() {
    const {cast, loading} = this.state;

    return (
      loading
        ? <Loader/>
        : <div className="row">
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
