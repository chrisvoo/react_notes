import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CartDetailsRows from './CartDetailsRows';

export default class CartDetails extends Component {
    getLinkClasses = () => `btn btn-secondary m-1 ${this.props.cartItems === 0 ? 'disabled' : ''}`;

    render() {
      const {
        cart, cartPrice, updateCartQuantity, removeFromCart,
      } = this.props;
      return (
        <div className="m-3">
          <h2 className="text-center">Your Cart</h2>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Product</th>
                <th className="text-right">Price</th>
                <th className="text-right">Subtotal</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <CartDetailsRows
                cart={cart}
                cartPrice={cartPrice}
                updateQuantity={updateCartQuantity}
                removeFromCart={removeFromCart}
              />
            </tbody>
          </table>
          <div className="text-center">
            <Link className="btn btn-primary m-1" to="/shop">
                  Continue Shopping
            </Link>
            <Link className={this.getLinkClasses()} to="/shop/checkout">
                  Checkout
            </Link>
          </div>
        </div>
      );
    }
}

CartDetails.defaultProps = {
  cartPrice: 0.0,
  cart: [],
  cartItems: [],
};

CartDetails.propTypes = {
  cart: PropTypes.array,
  cartPrice: PropTypes.number,
  cartItems: PropTypes.array,
  updateCartQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};
