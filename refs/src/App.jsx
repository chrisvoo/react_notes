import React, { Component } from 'react';
import Editor from './Editor';
import ProductTable from './ProductTable';
import { ColorInvalidElements } from './jQueryColorizer';
import { ForwardFormField } from './FormField';
import PortalWrapper from './PortalWrapper';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    this.editorRef = React.createRef();
    this.fieldRef = React.createRef();
    this.portalFieldRef = React.createRef();
  }

  colorFields = () => {
    ColorInvalidElements(this.editorRef.current);
  }

  addProduct = (product) => {
    const { products } = this.state;
    if (products.indexOf(product.name) === -1) {
      this.setState({ products: [...products, product] });
    }
  }

  focusPortal = () => {
    this.portalFieldRef.current.focus();
  }

  focusLocal = () => {
    this.fieldRef.current.focus();
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <PortalWrapper>
          <ForwardFormField label="Name" ref={this.portalFieldRef} />
        </PortalWrapper>
        <div className="text-center m-2">
          <button type="button" className="btn btn-primary" onClick={this.colorFields}>
            jQuery
          </button>
        </div>
        <div ref={this.editorRef}>
          <ForwardFormField label="Name" ref={this.fieldRef} />
          <Editor callback={this.addProduct} />
        </div>
        <div className="text-center m-2">
          <button type="button" className="btn btn-primary m-1" onClick={this.focusLocal}>
            Focus Local
          </button>
          <button type="button" className="btn btn-primary m-1" onClick={this.focusPortal}>
            Focus Portal
          </button>
        </div>
        <h6 className="bg-secondary text-white m-2 p-2">Products</h6>
        <div className="m-2">
          {
            products.length === 0
              ? <div className="text-center">No Products</div>
              : <ProductTable products={products} />
          }
        </div>
      </div>
    );
  }
}
