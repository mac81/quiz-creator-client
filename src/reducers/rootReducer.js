const initialState = {
    questions: []
};

function app(state = initialState, action) {
    switch (action.type) {
        case 'SET_QUESTIONS':
            return Object.assign({}, state, {
                questions: action.questions
            });

        case 'QUESTION_DELETED':
            return {
                ...state,
                questions: state.questions.filter(question => question._id !== action.question_id)
            };

        case 'QUESTION_CREATED':
            return {
                ...state,
                questions: [
                    ...state.questions,
                    action.payload
                ]
            };

        default:
            return state
    }
}


export default app;