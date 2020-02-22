import { StateType } from '../dataTypes';

export const getUsername = (store: StateType) => {
  return store.username;
}
