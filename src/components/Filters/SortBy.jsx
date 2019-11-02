import React from 'react';
import PropTypes from 'prop-types';

export default class SortBy extends React.Component {

  render() {
    const {sort_by, onChangeFilters, options} = this.props;

    return (
      <div className="form-group">
        <label htmlFor="sort_by">Сортировать по:</label>
        <select
          className="form-control"
          id="sort_by"
          name="sort_by"
          value={sort_by}
          onChange={onChangeFilters}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    )
  }
}

SortBy.defaultProps = {
  options: [
    {
      label: 'Популярные по убыванию',
      value: 'popularity.desc'
    },
    {
      label: 'Популярные по возрастанию',
      value: 'popularity.asc'
    },
    {
      label: 'Рейтинг по убыванию',
      value: 'vote_average.desc'
    },
    {
      label: 'Рейтинг по возрастанию',
      value: 'vote_average.asc'
    }
  ]
};

SortBy.propTypes = {
  onChangeFilters: PropTypes.func.isRequired
};