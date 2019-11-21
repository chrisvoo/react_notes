import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Display extends Component {
    formatValue = (data) => (Array.isArray(data) ? data.join(', ') : data.toString());

    render() {
      const { data } = this.props;
      const keys = Object.keys(data);
      if (keys.length === 0) {
        return (
          <div className="h5 bg-secondary p-2 text-white">
            No Data
          </div>
        );
      }

      return (
        <div className="container-fluid bg-secondary p-2">
          { keys.map((key) => (
            <div key={key} className="row h5 text-white">
              <div className="col">
                { key }:
              </div>
              <div className="col">
                { this.formatValue(data[key]) }
              </div>
            </div>
          ))}
        </div>
      );
    }
}

Display.defaultProps = {
  data: {},
};

Display.propTypes = {
  data: PropTypes.object,
};
