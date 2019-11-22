import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProductTableRow from './ProductTableRow';
import PaginationControls from '../../components/PaginationControls';

const ProductsTable = (props) => {
  const {
    totalSize, products, deleteProduct,
  } = props;

  return (
    <div>
      <h4 className="bg-info text-white text-center p-2">
        { `${totalSize} Products` }
      </h4>
      <PaginationControls
        keys={['ID', 'Name', 'Category']}
        {...props}
      />
      <table className="table table-sm table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th className="text-right">Price</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th className="text-center" />
          </tr>
        </thead>
        <tbody>
          { products.map((prod) => (
            <ProductTableRow
              key={prod.id}
              product={prod}
              deleteProduct={deleteProduct}
            />
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <Link to="/admin/products/create" className="btn btn-primary">
          Create Product
        </Link>
      </div>
    </div>
  );
};

export default ProductsTable;

ProductsTable.defaultProps = {
  products: [],
  totalSize: 0,
};

ProductsTable.propTypes = {
  products: PropTypes.array,
  totalSize: PropTypes.number,
  deleteProduct: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
};
