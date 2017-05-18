import actionTypes from 'actions/actionTypes';

const initialState = {
  isLoading: false
};

function app(state = initialState, action) {
  switch (action.type) {

  case actionTypes.setQuizzes:
    return {
      ...state,
      quizzes: action.payload,
      isLoading: false
    };

    case actionTypes.quizDeleted:
      return {
        ...state,
        quizzes: state.quizzes.filter(quiz => quiz._id !== action.quizId)
      };

  // case actionTypes.setQuiz:
  //   console.log(state)
  //   return {
  //     ...state,
  //     quizzes: {
  //       ...state.quizzes,
  //       quiz: action.payload
  //     }
  //   };


  default:
    return state
  }
}

export default app;

export const SELECTORS = {
  getQuizzes: (state) => state.quizzes.quizzes,
  // getQuiz: (state) => state.quizzes.quiz,
  // getQuizQuestions: (state) => state.quizzes.quiz && state.quizzes.quiz.questions
};
