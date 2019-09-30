import React from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends React.Component {

  render() {
    const {page, total_pages, onChangePage} = this.props;

    return (
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-secondary mr-4"
          disabled={page === 1}
          onClick={() => onChangePage(page - 1)}
        >Prev
        </button>
        <p className="mr-4 mb-0">{page} из {total_pages}</p>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onChangePage(page + 1)}
        >Next
        </button>
      </div>
    )
  }
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired
};