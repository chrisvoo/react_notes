import { ActionTypes } from '../Types';

const CartReducer = (storeData, action) => {
  /* It is important to keep the structure of your data store flat because changes deep in an object hierarchy
   * won’t be detected and displayed to the user. It is for this reason that the cart , cartItems , and cartPrice
   * properties are defined alongside the products and categories properties in the data store, rather than
   * grouped together into a single structure. */
  const newStore = {
    cart: [], cartItems: 0, cartPrice: 0, ...storeData,
  };

  switch (action.type) {
    case ActionTypes.CART_ADD: {
      const { product: p, quantity: q } = action.payload;
      const existing = newStore.cart.find((item) => item.product.id === p.id);

      if (existing) {
        existing.quantity += q;
      } else {
        newStore.cart = [...newStore.cart, action.payload];
      }
      newStore.cartItems += q;
      newStore.cartPrice += p.price * q;
      return newStore;
    }
    case ActionTypes.CART_UPDATE: {
      newStore.cart = newStore.cart.map((item) => {
        if (item.product.id === action.payload.product.id) {
          const diff = action.payload.quantity - item.quantity;
          newStore.cartItems += diff;
          newStore.cartPrice += (item.product.price * diff);
          return action.payload;
        }

        return item;
      });
      return newStore;
    }
    case ActionTypes.CART_REMOVE: {
      const selection = newStore.cart.find((item) => item.product.id === action.payload.id);
      newStore.cartItems -= selection.quantity;
      newStore.cartPrice -= selection.quantity * selection.product.price;
      newStore.cart = newStore.cart.filter((item) => item !== selection);
      return newStore;
    }
    case ActionTypes.CART_CLEAR:
      return {
        ...storeData, cart: [], cartItems: 0, cartPrice: 0,
      };
    default:
      return storeData || {};
  }
};

export default CartReducer;
