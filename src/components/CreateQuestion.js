import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as QuestionActions from 'actions/questions';

export class CreateQuestion extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            questionName: ''
        }
    }

    onChange = (e) => {
        this.setState({
            questionName: e.target.value
        })
    }

    addAnswer = () => {
        this.props.actions.createQuestion(this.state.questionName)
    }

    createQuestion = () => {
        this.props.actions.createQuestion(this.state.questionName)
    }

    render() {
        return (
            <div>
                <input onChange={this.onChange}/>
                <button onClick={this.createQuestion}>Create</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(QuestionActions, dispatch)
});

export default connect(undefined, mapDispatchToProps)(CreateQuestion);
