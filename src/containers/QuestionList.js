import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import * as QuestionActions from 'actions/questions';
import { SELECTORS } from 'reducers/rootReducer'
import { values } from 'lodash';

export class QuestionList extends React.Component {

    constructor(props) {
        super(props);

        this.props.actions.loadQuestions();
    }

    onDelete = (e) => {
        this.props.actions.deleteQuestion(e.target.id);
    }

    render() {
        const { questions } = this.props;

        return (
            <div>
                <ul>
                    {questions && values(questions).map(item => (
                        <li key={item._id}>
                            <button id={item._id} onClick={this.onDelete}>Delete</button>
                            <Link to={`questions/${item._id}`}>{item.question}</Link>
                        </li>
                    ))}
                </ul>
                <Link to="questions/new">Create new question</Link>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        questions: state.data.entities.questions
    }
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(QuestionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);