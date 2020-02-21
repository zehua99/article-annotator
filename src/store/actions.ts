import { CHANGE_USERNAME, ChangeUsernameActionType } from './actionTypes';

export function changeUsername(username: string): ChangeUsernameActionType {
  return {
    type: CHANGE_USERNAME,
    username,
  };
}
