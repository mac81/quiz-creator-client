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

  case actionTypes.questionAnswerDeleted:
    console.log(state)
    return {
      ...state,
      question: {
        ...state.question,
        answers: state.question.answers.filter(answer => 1 === 1)
      }
    }


  default:
    return state
  }
}

export default app;

export const SELECTORS = {
  getQuestions: (state) => state.questions.questions,
  getQuestion: (state) => state.questions.question && state.questions.question,
  //getQuestionPosition: (state) => state.questions.questions && state.questions.questions.findIndex(question => state.questions.question && question._id === state.questions.question._id), //TODO: Make this better
  getAnswers: (state) => state.questions.question && state.questions.question.answers
};