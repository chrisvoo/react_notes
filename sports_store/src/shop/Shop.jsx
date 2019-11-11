import React, { Component } from 'react';
import CategoryNavigation from './CategoryNavigation';
import ProductList from './ProductList';
import CartSummary from './CartSummary';
import ProductPageConnector from './ProductPageConnector';
import PaginationControls from '../components/PaginationControls';

const ProductPages = ProductPageConnector(PaginationControls);

export default class Shop extends Component {
  handleAddToCart = (...args) => {
    const { addToCart, history } = this.props;
    addToCart(...args);
    history.push('/shop/cart');
  }

  render() {
    const { products, categories } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col bg-dark text-white">
            <div className="navbar-brand">SPORTS STORE</div>
            <CartSummary {...this.props} />
          </div>
        </div>
        <div className="row">
          <div className="col-3 p-2">
            <CategoryNavigation baseUrl="/shop/products" categories={categories} />
          </div>
          <div className="col-9 p-2">
            <ProductPages />
            <ProductList products={products} addToCart={this.handleAddToCart} />
          </div>
        </div>
      </div>
    );
  }
}
