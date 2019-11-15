import React from 'react';
import PropTypes from 'prop-types';
import OrdersRow from './OrdersRow';
import PaginationControls from '../components/PaginationControls';

const OrdersTable = (props) => {
  const { toggleShipped, totalSize, orders } = props;
  return (
    <div>
      <h4 className="bg-info text-white text-center p-2">
        { totalSize }
        {' '}
        Orders
      </h4>
      <PaginationControls
        keys={['ID', 'Name']}
        {...props}
      />
      <table className="table table-sm table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th className="text-right">Total</th>
            <th className="text-center">Shipped</th>
          </tr>
        </thead>
        <tbody>
          { orders.map((order) => (
            <OrdersRow
              key={order.id}
              order={order}
              toggleShipped={() => toggleShipped(order.id, !order.shipped)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;

OrdersTable.defaultProps = {
  orders: [],
  totalSize: 0,
};

OrdersTable.propTypes = {
  toggleShipped: PropTypes.func.isRequired,
  orders: PropTypes.array,
  totalSize: PropTypes.number,
};
