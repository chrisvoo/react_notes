import { createStore, applyMiddleware } from 'redux';
import ShopReducer from './reducers/ShopReducer';
import CommonReducer from './reducers/CommonReducer';
import CartReducer from './reducers/CartReducer';
import { asyncActions } from './AsyncMiddleware';

/**
 * Redux data stores separate reading data from the operations that change it.
 * **Actions** are objects that are sent to the data store to make changes to the
 * data it contains. Actions have **types**, and action objects are created using
 * **action creators**.
 */
const SportsStoreDataStore = createStore(
  CommonReducer(ShopReducer, CartReducer),
  applyMiddleware(asyncActions)
);
export default SportsStoreDataStore;
