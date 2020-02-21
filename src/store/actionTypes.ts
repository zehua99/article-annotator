export const ADD_ARTICLE = 'ADD_ARTICLE';
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE';

export const ADD_ANNOTATION = 'ADD_ANNOTATION';
export const REMOVE_ANNOTATION = 'REMOVE_ANNOTATION';

export const CHANGE_COLOR = 'CHANGE_COLOR';

export const CHANGE_USERNAME = 'CHANGE_USERNAME';

export type ChangeUsernameActionType = {
  type: typeof CHANGE_USERNAME
  username: string
}
