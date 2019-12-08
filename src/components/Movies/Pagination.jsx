import React from 'react';

const Pagination = props => {
  const {page, total_pages, onChangePage} = props;
  return (
      <div className="btn-group mx-auto mb-4">
        <button
          type="button"
          className="btn btn-light"
          disabled={page === 1}
          onClick={onChangePage.bind(null, page - 1)}
        >
          Назад
        </button>
        <div className="d-flex align-items-center mx-2">{page} из {total_pages}</div>
        <button
          type="button"
          className="btn btn-light"
          onClick={onChangePage.bind(null, page + 1)}
        >
          Вперед
        </button>
      </div>
  )
};

export default Pagination;
