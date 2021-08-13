import {LOADING} from './actionType';

export const handlerLoading = payload => {
  return {
    type: LOADING,
    payload,
  };
};
