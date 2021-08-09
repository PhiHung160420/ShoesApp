import {getProfile} from '../../services/profileAPI';
import {GET_PROFILE, UPDATE_PROFILE} from './actionType';

export const handlerGetProfile = data => {
  return {
    type: GET_PROFILE,
    payload: data,
  };
};

export const actFetchGetProfileRequest = token => {
  return dispatch => {
    getProfile(token)
      .then(res => {
        dispatch(handlerGetProfile(res.data.content));
      })
      .catch(err => console.log(err));
  };
};
