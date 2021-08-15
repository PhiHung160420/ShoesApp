import {LOADING} from './actionType';

export const handlerSetLoading = payload => {
  return {
    type: LOADING,
    payload,
  };
};
