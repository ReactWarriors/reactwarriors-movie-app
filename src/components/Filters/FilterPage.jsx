import React from "react";

export default class FilterPage extends React.Component {
  handleClick = (page) => {
    return (event) => {
      this.props.updateFilters("page", page);
    };
  };

  render() {
    const {
      page,
      totalPages
      //updateFilters
    } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="page">
          Страница: {page} из {totalPages}
        </label>
        <nav aria-label="...">
          <ul className="pagination">
            <li className={"page-item" + (page === 1 ? " disabled" : "")}>
              <a
                className="page-link"
                href="/#"
                //onClick={updateFilters.bind(null, "page", 1)}
                onClick={this.handleClick(1)}
              >
                First
              </a>
            </li>
            <li className={"page-item" + (page === 1 ? " disabled" : "")}>
              <a
                className="page-link"
                href="/#"
                //onClick={updateFilters.bind(null, "page", page - 1)}
                onClick={this.handleClick(page - 1)}
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
                //onClick={updateFilters.bind(null, "page", page + 1)}
                onClick={this.handleClick(page + 1)}
              >
                {page + 1}
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="/#"
                //onClick={updateFilters.bind(null, "page", page + 1)}
                onClick={this.handleClick(page + 1)}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
