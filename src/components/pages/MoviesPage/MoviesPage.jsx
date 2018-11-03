import React from "react";
import Filters from "../../Filters/Filters";
import MoviesList from "../../Movies/MoviesList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  actionCreatorUpdateFilters,
  actionCreatorUpdatePagination
} from "../../../actions/actions";

class MoviesPage extends React.Component {
  render() {
    const {
      filters,
      onChangeFilters,
      pagination: { page, total_pages },
      onChangePagination
    } = this.props;
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
                  onChangeFilters={onChangeFilters}
                  onChangePagination={onChangePagination}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangePagination={onChangePagination}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filters: state.movies.filters,
    pagination: state.movies.pagination
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onChangeFilters: actionCreatorUpdateFilters,
      onChangePagination: actionCreatorUpdatePagination
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesPage);
