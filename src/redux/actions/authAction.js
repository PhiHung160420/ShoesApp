import {SET_ACCESS_TOKEN, REMOVE_ACCESS_TOKEN} from './actionType';

export const handlerSignIn = data => {
  return {
    type: SET_ACCESS_TOKEN,
    payload: data,
  };
};

export const handlerSignOut = data => {
  return {
    type: REMOVE_ACCESS_TOKEN,
    payload: data,
  };
};
