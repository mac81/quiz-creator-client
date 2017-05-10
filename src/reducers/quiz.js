import actionTypes from 'actions/actionTypes';

const initialState = {
  isLoading: false
};

function app(state = initialState, action) {
  switch (action.type) {

  case actionTypes.setQuiz:
    return {
      ...state,
      ...action.payload
    };


  default:
    return state
  }
}

export default app;

export const SELECTORS = {
  getQuiz: (state) => state.quiz,
  getQuizQuestions: (state) => state.quiz.questions
};