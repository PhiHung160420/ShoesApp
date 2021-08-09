import {getProfileAPI} from '../../services/profileAPI';
import {SET_PROFILE, UPDATE_PROFILE} from './actionType';

export const handlerSetProfile = data => {
  return {
    type: SET_PROFILE,
    payload: data,
  };
};

export const actFetchGetProfileRequest = token => {
  return dispatch => {
    getProfileAPI(token)
      .then(res => {
        dispatch(handlerSetProfile(res.data.content));
      })
      .catch(err => console.log(err));
  };
};
