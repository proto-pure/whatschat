import types from './action.types';

const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        userName: action.payload.userName,
        displayName: action.payload.displayName,
        userId: action.payload.userId,
      };

    case types.SET_APP_READY_STATE:
      return { ...state, appReady: true };

    default:
      return state;
  }
};

export default reducer;
