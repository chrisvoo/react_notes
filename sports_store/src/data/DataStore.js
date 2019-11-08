import { createStore } from 'redux';
import ShopReducer from './ShopReducer';

/**
 * Redux data stores separate reading data from the operations that change it.
 * **Actions** are objects that are sent to the data store to make changes to the
 * data it contains. Actions have **types**, and action objects are created using
 * **action creators**.
 */
const SportsStoreDataStore = createStore(ShopReducer);
export default SportsStoreDataStore;
