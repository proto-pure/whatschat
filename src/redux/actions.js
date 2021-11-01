import types from './action.types';

export const setUser = user => ({
  type: types.SET_USER,
  payload: user,
});

export const setAppReadyState = () => ({
  type: types.SET_APP_READY_STATE,
});
