import actionTypes from 'actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  authorizationFailed: false
};

function app(state = initialState, action) {
  switch (action.type) {

  case actionTypes.isAuthenticating:
    return {
      ...state,
      isAuthenticating: true
    };

  case actionTypes.authorizationFailed:
    return {
      ...state,
      authorizationFailed: true,
      isAuthenticating: false
    };

  case actionTypes.setUser:
    return {
      ...state,
      ...action.payload,
      isAuthenticated: true,
      isAuthenticating: false
    };

  case actionTypes.unSetUser:
    return {
      ...state,
      isAuthenticated: false,
      isAuthenticating: false
    };

  default:
    return state
  }
}

export default app;

export const SELECTORS = {
  getUser: (state) => state.user,
  getIsAuthenticating: (state) => state.user.isAuthenticating
};