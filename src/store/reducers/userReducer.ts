import { CHANGE_USERNAME, ChangeUsernameActionType } from '../actionTypes';

function userReducer(state: string = '', action: ChangeUsernameActionType) {
  if (action.type === CHANGE_USERNAME) {
    return action.username;
  }

  return state;
}

export default userReducer;;
