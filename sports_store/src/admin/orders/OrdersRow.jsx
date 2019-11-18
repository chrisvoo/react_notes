import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class OrdersRow extends Component {
    // eslint-disable-next-line
    calcTotal = (products) => products.reduce((total, p) => total += p.quantity * p.product.price, 0).toFixed(2)

    getShipping = (order) => (order.shipped
      ? <i className="fa fa-shipping-fast text-success" />
      : <i className="fa fa-exclamation-circle text-danger" />)

    render = () => {
      const { order, toggleShipped } = this.props;
      const {
        id, name, email, products, shipped,
      } = order;
      return (
        <tr>
          <td>{ id }</td>
          <td>{ name }</td>
          <td>{ email }</td>
          <td className="text-right">
                  $
            { this.calcTotal(products) }
          </td>
          <td className="text-center">
            <button
              type="button"
              className="btn btn-sm btn-block bg-muted"
              onClick={toggleShipped}
            >
              { this.getShipping(order)}
              <span>{ shipped ? ' Shipped' : ' Pending'}</span>
            </button>
          </td>
        </tr>
      );
    }
}

OrdersRow.defaultProps = {
  order: {},
};

OrdersRow.propTypes = {
  order: PropTypes.object,
  toggleShipped: PropTypes.func.isRequired,
};
