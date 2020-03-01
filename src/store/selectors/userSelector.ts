import { StateType } from '../dataTypes';
import { createSelector } from 'reselect';

export const getUsername = (store: StateType) => {
  return store.username;
}

export const isUserLoggedIn = createSelector(
  getUsername,
  username => username !== undefined && username.length > 0,
);
