import {SET_ACCESS_TOKEN, REMOVE_ACCESS_TOKEN} from '../actions/actionType';

const initialState = {
  accessToken: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {...state, accessToken: action.payload};
    case REMOVE_ACCESS_TOKEN:
      return {...state, accessToken: action.payload};
    default:
      return state;
  }
};

export default AuthReducer;
