import React from "react";

export default class ChangePage extends React.Component {
  render() {
    const { page, totalPages, onChangePage } = this.props;
    return (
      <div className="form-group">
        <h4>
          Страница: {page} из {totalPages}
        </h4>
        <nav aria-label="...">
          <ul className="pagination">
            <li className={"page-item" + (page === 1 ? " disabled" : "")}>
              <a
                className="page-link"
                href="/#"
                onClick={onChangePage.bind(null, 1)}
              >
                First
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
      </div>
    );
  }
}
