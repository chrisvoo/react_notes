import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Thanks extends Component {
  render() {
    const { order } = this.props;

    return (
      <div>
        <div className="col bg-dark text-white">
          <div className="navbar-brand">SPORTS STORE</div>
        </div>
        <div className="m-2 text-center">
          <h2>Thanks!</h2>
          <p>Thanks for placing your order.</p>
          <p>Your order is # { order ? order.id : 0 }</p>
          <p>We'll ship your goods as soon as possible.</p>
          <Link to="/shop" className="btn btn-primary">
            Return to Store
          </Link>
        </div>
      </div>
    );
  }
}

Thanks.defaultProps = {
  order: null,
};

Thanks.propTypes = {
  order: PropTypes.object,
};
