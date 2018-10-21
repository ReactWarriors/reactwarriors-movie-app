import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreatorGetMovies } from "../../actions/actions";

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
      getMovies = (filters, page) => {
        const { sort_by, primary_release_year, with_genres } = filters;
        const queryStringParams = {
          language: "ru-RU",
          sort_by: sort_by,
          page: page,
          primary_release_year: primary_release_year
        };

        if (with_genres.length > 0)
          queryStringParams.with_genres = with_genres.join(",");

        // this.props.updateMovies(
        //   CallApi.get("/discover/movie", {
        //     params: queryStringParams
        //   })
        // );

        // after moving pagination to store
        // this.props.onChangePagination({
        //   page: data.page,
        //   total_pages: data.total_pages
        // });

        this.props.getMovies(queryStringParams);
        // CallApi.get("/discover/movie", {
        //   params: queryStringParams
        // }).then(data => {
        //   this.props.updateMovies(data.results);
        // });
      };

      componentDidMount() {
        this.getMovies(this.props.filters, this.props.page);
      }

      componentDidUpdate(prevProps) {
        if (!_.isEqual(this.props.filters, prevProps.filters)) {
          this.props.onChangePagination({ page: 1 });
          this.getMovies(this.props.filters, 1);
        }

        if (this.props.page !== prevProps.page) {
          this.getMovies(this.props.filters, this.props.page);
        }
      }

      render() {
        return <Component movies={this.props.movies} />;
      }
    }
  );
