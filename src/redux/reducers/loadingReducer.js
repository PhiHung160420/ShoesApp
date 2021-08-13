import {LOADING} from '../actions/actionType';

const initialState = {
  loading: true,
};

const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: action.payload};
    default:
      return state;
  }
};

export default LoadingReducer;
