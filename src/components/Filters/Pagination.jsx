import React from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends React.Component {

  render() {
    const {page, total_pages, onChangePage} = this.props;

    return (
      <div className="mt-3">
        <button
          type="button"
          className="btn btn-secondary mr-4"
          disabled={page === 1}
          onClick={() => onChangePage(page - 1)}
        >Предыдущая
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onChangePage(page + 1)}
        >Следующая
        </button>
        <p className="mt-3">{page} из {total_pages}</p>
      </div>
    )
  }
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired
};