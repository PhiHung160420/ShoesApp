import {SET_PROFILE, UPDATE_PROFILE} from './actionType';

export const handlerSetProfile = data => {
  return {
    type: SET_PROFILE,
    payload: data,
  };
};
