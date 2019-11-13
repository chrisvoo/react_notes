import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CartDetailsRows extends Component {
  handleChange = (product, event) => {
    const { updateQuantity } = this.props;
    updateQuantity(product, event.target.value);
  }

  render() {
    const { cart, cartPrice, removeFromCart } = this.props;

    if (!cart || cart.length === 0) {
      return (
        <tr>
          <td colSpan="5">Your cart is empty</td>
        </tr>
      );
    }

    return (
      <>
        {cart.map((item) => (
          <tr key={item.product.id}>
            <td>
              <input
                type="number"
                value={item.quantity}
                onChange={(ev) => this.handleChange(item.product, ev)}
              />
            </td>
            <td>{item.product.name}</td>
            <td>{`$ ${item.product.price.toFixed(2)}`}</td>
            <td>{`$ ${(item.quantity * item.product.price).toFixed(2)}`}</td>
            <td>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => removeFromCart(item.product)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <th colSpan="3" className="text-right">Total:</th>
          <th colSpan="2">{`$ ${cartPrice.toFixed(2)}`}</th>
        </tr>
      </>
    );
  }
}

CartDetailsRows.defaultProps = {
  cart: [],
  cartPrice: 0.0,
};

CartDetailsRows.propTypes = {
  updateQuantity: PropTypes.func.isRequired,
  cartPrice: PropTypes.number,
  removeFromCart: PropTypes.func.isRequired,
  cart: PropTypes.array,
};
