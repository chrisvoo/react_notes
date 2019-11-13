import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ValidatedForm from '../components/forms/ValidatedForm';

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.defaultAttrs = { type: 'text', required: true };
    this.formModel = [
      { label: 'Name' },
      { label: 'Email', attrs: { type: 'email' } },
      { label: 'Address' },
      { label: 'City' },
      { label: 'Zip/Postal Code', name: 'zip' },
      { label: 'Country' },
    ];
  }

    handleSubmit = (formData) => {
      const {
        placeOrder, clearCart, history, cart,
      } = this.props;

      const order = {
        ...formData,
        products: cart.map((item) => ({ quantity: item.quantity, product_id: item.product.id })),
      };

      placeOrder(order);
      clearCart();
      history.push('/shop/thanks');
    }

    handleCancel = () => {
      const { history } = this.props;
      history.push('/shop/cart');
    }

    render() {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col bg-dark text-white">
              <div className="navbar-brand">SPORTS STORE</div>
            </div>
          </div>
          <div className="row">
            <div className="col m-2">
              <ValidatedForm
                formModel={this.formModel}
                defaultAttrs={this.defaultAttrs}
                submitCallback={this.handleSubmit}
                cancelCallback={this.handleCancel}
                submitText="Place Order"
                cancelText="Return to Cart"
              />
            </div>
          </div>
        </div>
      );
    }
}

Checkout.defaultProps = {
  history: {},
  cart: [],
};

Checkout.propTypes = {
  history: PropTypes.object,
  placeOrder: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  cart: PropTypes.array,
};
