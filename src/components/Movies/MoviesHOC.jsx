import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreatorGetMovies } from "../../actions/actionsMovies";

const mapStateToProps = state => {
  return {
    movies: state.movies.data
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getMovies: actionCreatorGetMovies
    },
    dispatch
  );
};

export default Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class MoviesHOC extends React.Component {
      getMovies = ({ filters, page }) => {
        this.props.getMovies({ filters, page });
      };

      componentDidMount() {
        this.getMovies({ filters: this.props.filters, page: this.props.page });
      }

      render() {
        return <Component movies={this.props.movies} />;
      }
    }
  );
