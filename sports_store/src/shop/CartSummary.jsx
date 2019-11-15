import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CartSummary = (props) => {
  const { cartItems, cartPrice } = props;

  const getSummary = () => {
    if (cartItems > 0) {
      return (
        <span>
          {`${cartItems} item(s), ${cartPrice.toFixed(2)}`}
        </span>
      );
    }

    return <span>Your cart: (empty)</span>;
  };

  return (
    <div className="float-right">
      <small>
        {getSummary()}
        <Link
          className={`btn btn-sm bg-dark text-white ${cartItems === 0 ? 'disabled' : ''}`}
          to="/shop/cart"
        >
          <i className="fa fa-shopping-cart" />
        </Link>
      </small>
    </div>
  );
};

export default CartSummary;

CartSummary.defaultProps = {
  cartItems: 0,
  cartPrice: 0,
};

CartSummary.propTypes = {
  cartItems: PropTypes.number,
  cartPrice: PropTypes.number,
};
