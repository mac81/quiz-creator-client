import actionTypes from 'actions/actionTypes';

const initialState = {
  isLoading: true
};

function app(state = initialState, action) {
  switch (action.type) {

  case actionTypes.setQuizzes:
    return {
      ...state,
      quizzes: action.payload,
      isLoading: false
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
  appIsLoading: (state) => state.application.isLoading
};