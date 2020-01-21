import React from "react";
import PersonaltItem from "./PersonaltItem";
import CallApi from "../../../../api/api";

class MovieCredits extends React.Component {
  constructor() {
    super();

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

    CallApi.get(`/movie/${this.props.movieId}/credits`, {
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

export default MovieCredits;
