import {
  CHANGE_USERNAME,
  ChangeUsernameActionType,
  ADD_COLORS_TO_DOCUMENT,
} from './actionTypes';

export function changeUsername(username: string): ChangeUsernameActionType {
  return {
    type: CHANGE_USERNAME,
    username,
  };
}

export function addColorsToDocument(className: string) {
  return {
    type: ADD_COLORS_TO_DOCUMENT,
    className,
  };
}
