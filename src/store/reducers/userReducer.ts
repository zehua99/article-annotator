import Cookies from 'js-cookie';
import { CHANGE_USERNAME, ChangeUsernameActionType } from '../actionTypes';

function userReducer(state: string = '', action: ChangeUsernameActionType) {
  if (action.type === CHANGE_USERNAME) {
    Cookies.set('username', action.username);
    return action.username;
  }

  return state;
}

export default userReducer;;
