import { getProfileAPI } from '../../services/profileAPI';
import { typeAction } from './actionType';

const {SET_PROFILE} = typeAction.profileActions;

export const saveProfileAction = data => {
  return {
    type: SET_PROFILE,
    payload: data,
  };
};

export const fetchProfileAction = token => {
  return dispatch => {
    getProfileAPI(token)
      .then(res => {
        dispatch(saveProfileAction(res.data.content));
      })
      .catch(err => console.log(err));
  };
};
