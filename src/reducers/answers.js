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


  default:
    return state
  }
}

export default answers;

export const SELECTORS = {
  getAnswers: (state) => state.answers.answers
};