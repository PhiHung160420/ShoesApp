import {SET_PROFILE} from '../actions/actionType';

const initialState = {
  profile: null,
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {...state, profile: action.payload};
    default:
      return state;
  }
};

export default ProfileReducer;
