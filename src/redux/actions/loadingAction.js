import {typeAction} from './actionType';
const {LOADING} = typeAction.loadingActions;

export const handlerSetLoading = payload => {
  return {
    type: LOADING,
    payload,
  };
};
