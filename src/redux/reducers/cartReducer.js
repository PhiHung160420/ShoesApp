import {typeAction} from '../actions/actionType';

const {
  ADD_TO_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  REMOVE_FROM_CART,
  GET_NUMBER_CART,
  SET_CART,
  REMOVE_ALL_CART,
} = typeAction.cartActions;

const initialState = {
  carts: [],
  numberCart: 0,
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        carts: action.payload.carts,
        numberCart: action.payload.numberCart,
      };
    case GET_NUMBER_CART:
      return {
        ...state,
      };
    case REMOVE_ALL_CART:
      return {
        ...state,
        carts: action.payload,
        numberCart: 0,
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
      const indexAsc = state.carts.findIndex(e => e.id == action.payload.id);
      state.carts[indexAsc].quantity++;
      return {
        ...state,
      };
    case DECREMENT_QUANTITY:
      const indexDesc = state.carts.findIndex(e => e.id == action.payload.id);
      let quantity = state.carts[indexDesc].quantity;
      if (quantity >= 0) {
        state.carts[indexDesc].quantity--;
      }
      return {
        ...state,
      };
    case REMOVE_FROM_CART:
      const indexRemove = state.carts.findIndex(e => e.id == action.payload.id);
      if (state.numberCart > 0) {
        state.numberCart--;
      }
      return {
        ...state,
        carts: state.carts.filter(item => {
          return item.id !== state.carts[indexRemove].id;
        }),
      };
    default:
      return state;
  }
};

export default CartReducer;
