import React from 'react';

class Pagination extends React.Component {

  handelClick = newPage => () => {
    this.props.onChangePage(newPage);
  };

  render() {
    const {page, total_pages} = this.props;

    return (
      <div className="btn-group mx-auto mb-4">
        <button
          type="button"
          className="btn btn-light"
          disabled={page === 1}
          onClick={this.handelClick(page - 1)}
        >
          Назад
        </button>
        <div className="d-flex align-items-center mx-2">{page} из {total_pages}</div>
        <button
          type="button"
          className="btn btn-light"
          onClick={this.handelClick(page + 1)}
        >
          Вперед
        </button>
      </div>
    )
  }
}

export default Pagination;
