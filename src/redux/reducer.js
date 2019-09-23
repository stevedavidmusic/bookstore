const initialState = {
  user: {
    user_id: null,
    auth0_id: "",
    profile_name: "",
    email: "",
    picture: ""
  },
  cart: []
};

const GET_USER = "GET_USER";
const GET_CART = "GET_CART";
const CLEAR_CART = "CLEAR_CART";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload };

    case GET_CART:
      return { ...state, cart: action.payload };

    case CLEAR_CART:
      return { ...state, cart: [] };

    default:
      return state;
  }
};

export function getUser(user) {
  return {
    type: GET_USER,
    payload: user
  };
}

export function getCart(cart) {
  return {
    type: GET_CART,
    payload: cart
  };
}

export function clearCart() {
  return {
    type: CLEAR_CART
  };
}

export default reducer;
