import {SAVE_INFO_PAYMENT} from './actionType';

export const handlderSaveInfoPayment = payload => {
  return {
    type: SAVE_INFO_PAYMENT,
    payload,
  };
};
