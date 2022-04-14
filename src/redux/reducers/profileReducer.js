import {typeAction} from '../actions/actionType';

const {SET_PROFILE, UPDATE_PROFILE} = typeAction.profileActions;

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
