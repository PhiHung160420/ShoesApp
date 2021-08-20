import {SET_PROFILE, TOKEN_SESSION} from '../actions/actionType';

const initialState = {
  profile: null,
  session: true,
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {...state, profile: action.payload};
    case TOKEN_SESSION:
      return {...state, session: action.payload};
    default:
      return state;
  }
};

export default ProfileReducer;
