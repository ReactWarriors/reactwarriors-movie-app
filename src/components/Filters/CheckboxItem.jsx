import React from 'react';

class CheckboxItem extends React.Component {
  render() {
    const {item, checked, onChange} = this.props;

    return (
      <div>
        <input
          className="form-check-input"
          type="checkbox"
          id={item.id}
          name={item.name}
          onChange={onChange}
          checked={!!checked}
        />
        <label
          className="form-check-label"
          htmlFor={item.id}
        >
          {item.name}
        </label>
      </div>

    )
  }
}

export default CheckboxItem;
