import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as QuestionActions from '../actions/questions';

export class EditQuestion extends React.Component {

    onClick = (answerId) => {
        this.props.actions.updateQuestion(this.props.item._id, 'correctAnswerId', answerId)
    }

    render() {
        const { item } = this.props;

        if(!item) { return null }

        return (
            <div>
                <input defaultValue={item.question} />

                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Answer</th>
                            <th>Correct answer</th>
                        </tr>
                    </thead>
                    <tbody>
                    {item.answers.map((item, index) => (
                        <tr key={index}>
                            <td><button>Delete</button></td>
                            <td><button>Move</button></td>
                            <td><input defaultValue={item.answer}/></td>
                            <td><input type="radio" onClick={() => this.onClick(item._id)} name="correctAnswer" checked={item.correctAnswer}/></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        item: state.questions.find(question => question._id === props.match.params.id)
    }
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(QuestionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditQuestion);