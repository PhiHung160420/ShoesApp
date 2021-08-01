import {
  ADD_TO_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  REMOVE_FROM_CART,
  GET_NUMBER_CART,
} from '../actions/actionType';

const initialState = {
  carts: [],
  numberCart: 0,
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NUMBER_CART:
      return {
        ...state,
      };
    case ADD_TO_CART:
      const product = action.payload;
      var check = false;
      if (state.numberCart == 0) {
        let cart = {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          size: product.size,
          quantity: 1,
        };
        state.carts.push(cart);
      } else {
        state.carts.map((item, key) => {
          if (item.id == product.id) {
            state.carts[key].quantity++;
            check = true;
          }
        });

        if (!check) {
          let _cart = {
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            size: product.size,
            quantity: 1,
          };
          state.carts.push(_cart);
        }
      }
      console.log(JSON.stringify(state.carts));
      if (!check) {
        return {
          ...state,
          numberCart: state.numberCart + 1,
        };
      } else {
        return {
          ...state,
        };
      }
    case INCREMENT_QUANTITY:
      state.carts[action.payload].quantity++;
      return {
        ...state,
      };
    case DECREMENT_QUANTITY:
      let quantity = state.carts[action.payload].quantity;
      if (quantity > 1) {
        state.carts[action.payload].quantity--;
      }
      return {
        ...state,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        carts: state.carts.filter(item => {
          return item.id !== state.carts[action.payload].id;
        }),
      };
    default:
      return state;
  }
};

export default CartReducer;
