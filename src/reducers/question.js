import actionTypes from 'actions/actionTypes';

const initialState = {
  isLoading: false
};

function question(state = initialState, action) {
  switch (action.type) {

  case actionTypes.setQuestion:
    return {
      ...state,
      question: action.payload,
      isLoading: false
    };

  case actionTypes.questionCreated:
    return {
      ...state,
      questions: [
        ...state,
        action.payload
      ]
    };

  case actionTypes.questionDeleted:
    return {
      ...state,
      question: null
    };


  case actionTypes.questionUpdated:
    return {
      ...state,
      question: action.payload
    };


  default:
    return state
  }
}

export default question;

export const SELECTORS = {
  getQuestion: (state) => state.question.question
};