import actionTypes from 'actions/actionTypes';

const initialState = {
  isLoading: false
};

function app(state = initialState, action) {
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
        ...state.questions,
        action.payload
      ]
    };

  case actionTypes.questionDeleted:
    return {
      ...state,
      questions: state.questions.filter(question => question._id !== action.question_id)
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

export default app;

export const SELECTORS = {
  getQuestions: (state) => state.questions.questions,
  getQuestion: (state) => state.questions.question && state.questions.question,
  getAnswers: (state) => state.questions.question && state.questions.question.answers
};