import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SortBy extends Component {
  static propTypes = {
    sort_by: PropTypes.string.isRequired,
    onChangeFilters: PropTypes.func.isRequired
  };

  static defaultProps = {
    options: [
      {
        label: "Популярные по убыванию",
        value: "popularity.desc"
      },
      {
        label: "Популярные по возростанию",
        value: "popularity.asc"
      },
      {
        label: "Рейтинг по убыванию",
        value: "vote_average.desc"
      },
      {
        label: "Рейтинг по возростанию",
        value: "vote_average.asc"
      }
    ]
  };


  getYearsArr = () => {
    const years = [{label: "По году", value: "primary_release_year"}];
    for (let i = 2025; i > 1949; i = i - 1) {
      years.push(
        {
          label: i,
          value: i
        }
      );
    }
    return years;
  };

  render() {
    const yearsArr = this.getYearsArr();
    const {
      sort_by,
      onChangeFilters,
      options,
      primary_release_year
    } = this.props;


    return (
      <div className="form-group">
        <label htmlFor="sort_by">Сортировать по:</label>
        <select
          id="sort_by"
          name="sort_by"
          className="form-control my-2"
          value={sort_by}
          onChange={onChangeFilters}
        >
          {options.map(option => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        <select
          id="primary_release_year"
          name="primary_release_year"
          className="form-control my-2"
          value={primary_release_year}
          onChange={onChangeFilters}
        >
          {
            yearsArr.map(option => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))
          }
        </select>
      </div>
    )
  }
}
