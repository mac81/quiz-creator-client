import actionTypes from 'actions/actionTypes';

const initialState = {
  isLoading: false
};

function answers(state = initialState, action) {
  switch (action.type) {

  case actionTypes.setAnswers:
    return {
      ...state,
      answers: action.answers
    };

  case actionTypes.answerCreated:
    return {
      ...state,
      answers: [...state.answers, action.payload]
    };

  case actionTypes.answerDeleted:
    return {
      ...state,
      answers: state.answers.filter(answer => answer._id !== action.payload)
    };


  default:
    return state
  }
}

export default answers;

export const SELECTORS = {
  getAnswers: (state) => state.answers.answers
};