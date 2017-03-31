import actionTypes from 'actions/actionTypes';

const initialState = {
  isLoading: false,
  questions: []
};

function app(state = initialState, action) {
  switch (action.type) {

  case actionTypes.fetchQuestions:
    return Object.assign({}, state, {
      isLoading: true
    });

  case actionTypes.setQuestions:
    return Object.assign({}, state, {
      questions: action.questions,
      isLoading: false
    });

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
      questions: state.questions.map(question => question._id === action.payload._id ?
        Object.assign({}, question, action.payload) :
        question
      )
    };

  default:
    return state
  }
}

export default app;