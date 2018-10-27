import React from "react";
import Filters from "../../Filters/Filters";
import MoviesList from "../../Movies/MoviesList";
import { connect } from "react-redux";
import * as actionsMovies from "../../../actions/actionsMovies";
import { bindActionCreators } from "redux";

class MoviesPage extends React.Component {
  onChangeFilters = event => {
    this.props.updateFilter({
      [event.target.name]: event.target.value
    });
  };

  onChangePagination = ({ page, total_pages }) => {
    this.props.updatePagination({
      page,
      total_pages
    });
  };

  render() {
    const { filters, page, total_pages } = this.props;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card w-100">
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  page={page}
                  total_pages={total_pages}
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  onChangePagination={this.onChangePagination}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangePagination={this.onChangePagination}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    page: state.movies.pagination.page,
    total_pages: state.movies.pagination.total_pages,
    filters: state.movies.filters
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateFilter: actionsMovies.actionCreatorUpdateFilter,
      updatePagination: actionsMovies.actionCreatorUpdatePagination
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesPage);
