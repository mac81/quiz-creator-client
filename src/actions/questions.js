export const loadQuestions = () => {
    return (dispatch, getState) => {
        console.log(getState());
        fetch('/api/questions', {
            method: 'get'
        }).then(function(response) {
            return response.json();
        }).then(function(questions) {
            dispatch(setQuestions(questions));
        }).catch(function(err) {
            console.log(err);
        });
    }
};

export const createQuestion = (questionName) => {
    return (dispatch, getState) => {
        fetch(`/api/questions`, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                question: questionName
            })
        }).then(function(response) {
            return response.json();
        }).then(function(response) {
            dispatch(questionCreated(response.payload));
        }).catch(function(err) {
            console.log(err);
        });
    }
};

export const deleteQuestion = (question_id) => {
    return (dispatch, getState) => {
        fetch(`/api/questions/${question_id}`, {
            method: 'delete'
        }).then(function(response) {
            return response.json();
        }).then(function() {
            dispatch(questionDeleted(question_id));
        }).catch(function(err) {
            console.log(err);
        });
    }
};

export const updateQuestion = (question_id, key, value) => {
    return (dispatch, getState) => {
        fetch(`/api/questions/${question_id}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                [key]: value
            })
        }).then(function(response) {
            return response.json();
        }).then(function(response) {
            dispatch(questionUpdated(response.payload));
        }).catch(function(err) {
            console.log(err);
        });
    }
};

function setQuestions(questions) {
    return {
        type: 'SET_QUESTIONS',
        questions
    }
}

function questionCreated(payload) {
    return {
        type: 'QUESTION_CREATED',
        payload
    }
}

function questionDeleted(question_id) {
    return {
        type: 'QUESTION_DELETED',
        question_id
    }
}

function questionUpdated(payload) {
    return {
        type: 'QUESTION_UPDATED',
        payload
    }
}