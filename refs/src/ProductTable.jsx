import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductTable extends Component {
  render() {
    return (
      <table className="table table-sm table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.products.map((p) => (
              <tr key={p.name}>
                <td>{ p.name }</td>
                <td>{ p.category }</td>
                <td>
$
                    { Number(p.price).toFixed(2) }
                                            </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

ProductTable.defaultProps = {
  products: [],
};

ProductTable.propTypes = {
  products: PropTypes.array,
};
