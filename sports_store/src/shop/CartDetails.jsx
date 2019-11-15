import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CartDetailsRows from './CartDetailsRows';

const CartDetails = (props) => {
  const {
    cart, cartPrice, updateCartQuantity, removeFromCart, cartItems,
  } = props;
  const cssClasses = `btn btn-secondary m-1 ${cartItems === 0 ? 'disabled' : ''}`;

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
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
        <Link className={cssClasses} to="/shop/checkout">
              Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartDetails;

CartDetails.defaultProps = {
  cartPrice: 0.0,
  cart: [],
  cartItems: 0,
};

CartDetails.propTypes = {
  cart: PropTypes.array,
  cartPrice: PropTypes.number,
  cartItems: PropTypes.number,
  updateCartQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};
