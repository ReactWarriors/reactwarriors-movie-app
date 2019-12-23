import React from "react";
import SortBy from "./SortBy";
import ChangePage from "./ChangePage";

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by },
      page,
      totalPages,
      onChangeFilters,
      onChangePage,
    } = this.props;
    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />

        <ChangePage
          page={page}
          totalPages={totalPages}
          onChangePage={onChangePage}
        />

        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h4 className="bold">Scrollable Menu</h4>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-default dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Scrollable Menu <span className="caret"></span>
                </button>
                <ul className="dropdown-menu scrollable-menu" role="menu">
                  <li>
                    <a href="/#">Action</a>
                  </li>
                  <li>
                    <a href="/#">Another action</a>
                  </li>
                  <li>
                    <a href="/#">Something else here</a>
                  </li>
                  <li>
                    <a href="/#">Action</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
