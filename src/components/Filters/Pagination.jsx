import React from 'react'

export default class Pagination extends React.Component {
  render() {
    const { page, total_pages, onChangePage, onReset } = this.props
    return (
      <div className="form-group">
        <div className="pagination-buttons">
          <button
            type="button"
            className="btn btn-primary"
            disabled={page === 1}
            onClick={onChangePage.bind(null, page - 1)}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={page >= total_pages}
            onClick={onChangePage.bind(null, page + 1)}
          >
            Вперед
          </button>
          <button type="button" className="btn btn-danger" onClick={onReset}>
            Сброс
          </button>
        </div>
        <div className="pages-info">{`Страница: ${page}/${total_pages}`}</div>
      </div>
    )
  }
}
