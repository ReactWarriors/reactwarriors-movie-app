import React from "react";
import SortBy from "./SortBy";

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

        <h4>
          Страница: {page} из {totalPages}
        </h4>
        <nav aria-label="...">
          {/* <h4>
            {" "}
            <span class="badge badge-secondary">Page</span>
          </h4> */}
          <ul className="pagination">
            <li className={"page-item" + (page === 1 ? " disabled" : "")}>
              <a
                className="page-link"
                href="/#"
                onClick={onChangePage.bind(null, page - 1)}
              >
                Previous
              </a>
            </li>
            <li className={"page-item" + (page === 1 ? " disabled" : "")}>
              <a
                className="page-link"
                href="/#"
                onClick={onChangePage.bind(null, page - 1)}
              >
                {page === 1 ? "-" : page - 1}
              </a>
            </li>
            <li className="page-item active" aria-current="page">
              <span className="page-link">
                {page}
                <span className="sr-only">(current)</span>
              </span>
            </li>
            <li className="page-item">
              {" "}
              <a
                className="page-link"
                href="/#"
                onClick={onChangePage.bind(null, page + 1)}
              >
                {page + 1}
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="/#"
                onClick={onChangePage.bind(null, page + 1)}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </form>
    );
  }
}
