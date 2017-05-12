import actionTypes from 'actions/actionTypes';

const initialState = {
  isLoading: false
};

function questions(state = initialState, action) {
  switch (action.type) {

  case actionTypes.fetchQuestions:
    return Object.assign({}, state, {
      isLoading: true
    });

  case actionTypes.setQuestions:
    return {
      ...state,
      questions: action.payload,
      isLoading: false
    };

  case actionTypes.questionDeleted:
    return {
      ...state,
      questions: state.questions.filter(question => question._id !== action.question_id)
    };

  default:
    return state
  }
}

export default questions;

export const SELECTORS = {
  getQuestions: (state) => state.questions.questions
};