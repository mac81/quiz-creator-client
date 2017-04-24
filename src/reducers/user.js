import actionTypes from 'actions/actionTypes';

const initialState = {
  isLoggedIn: false
};

function app(state = initialState, action) {
  switch (action.type) {

  case actionTypes.setUser:
    return {
      ...state,
      user: action.payload,
      isLoggedIn: true
    };

  case actionTypes.setQuiz:
    return {
      ...state,
      quiz: action.payload
    };


  default:
    return state
  }
}

export default app;

export const SELECTORS = {
  getUser: (state) => state.user
};