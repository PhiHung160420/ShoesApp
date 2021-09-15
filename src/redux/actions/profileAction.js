import {getProfileAPI} from '../../services/profileAPI';
import {typeAction} from './actionType';

const {SET_PROFILE, UPDATE_PROFILE, TOKEN_SESSION} = typeAction.profileActions;

export const handlerSetProfile = data => {
  return {
    type: SET_PROFILE,
    payload: data,
  };
};

export const handlerSession = payload => {
  return {
    type: TOKEN_SESSION,
    payload,
  };
};

export const actFetchGetProfileRequest = token => {
  return dispatch => {
    getProfileAPI(token)
      .then(res => {
        dispatch(handlerSetProfile(res.data.content));
      })
      .catch(err => {
        dispatch(handlerSession(false));
      });
  };
};
