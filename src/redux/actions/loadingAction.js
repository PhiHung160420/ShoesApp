import {typeAction} from './actionType';
const {LOADING} = typeAction.loadingActions;

export const loadingAction = payload => {
  return {
    type: LOADING,
    payload,
  };
};
