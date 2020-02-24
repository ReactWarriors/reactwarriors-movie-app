import React from 'react'

export default class Pagination extends React.Component {
  render() {
    const { page, total_pages, onChangePage, onReset } = this.props
    return (
      <div>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-light"
            disabled={page === 1}
            onClick={onChangePage.bind(null, page - 1)}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            disabled={page >= total_pages}
            onClick={onChangePage.bind(null, page + 1)}
          >
            Вперед
          </button>
          <button type="button" className="btn btn-danger" onClick={onReset}>
            Сброс
          </button>
        </div>
        <div>{`Страница: ${page}/${total_pages}`}</div>
      </div>
    )
  }
}
