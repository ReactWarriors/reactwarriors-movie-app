import React from "react";
import { MovieContext} from "../pages/MoviePage/MoviePage";

export default Component =>
  class MovieContextHOC extends React.Component {
    render() {
      return (
        <MovieContext.Consumer>
          {context => <Component {...this.props} {...context}/>}
        </MovieContext.Consumer>
      )
    }
  }
