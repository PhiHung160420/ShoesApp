import {typeAction} from './actionType';

const {SET_ACCESS_TOKEN, REMOVE_ACCESS_TOKEN} = typeAction.authActions;

export const loginAction = data => {
  return {
    type: SET_ACCESS_TOKEN,
    payload: data,
  };
};

export const logoutAction = data => {
  return {
    type: REMOVE_ACCESS_TOKEN,
    payload: data,
  };
};
