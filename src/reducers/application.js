import actionTypes from 'actions/actionTypes';

const initialState = {
  isLoading: true
};

function app(state = initialState, action) {
    
  switch (action.type) {

  case actionTypes.setStatus:
      return {
        ...state,
        status: action.status
      };

  default:
    return state
  }
}

export default app;

export const SELECTORS = {
  appIsLoading: (state) => state.application.isLoading
};
