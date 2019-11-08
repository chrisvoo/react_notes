import React, { Component } from 'react';

export default class VisibilityControl extends Component {
    render = () => {
      const { isChecked, callback, description } = this.props;

      return (
        <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isChecked}
              onChange={(e) => callback(e.target.checked)}
            />
            <label className="form-check-label">
                Show {description}
            </label>
        </div>
      );
    }
}