import {typeAction} from '../actions/actionType';

const {SET_PROFILE, UPDATE_PROFILE, TOKEN_SESSION} = typeAction.profileActions;

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
