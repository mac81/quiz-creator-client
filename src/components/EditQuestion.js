import React from 'react';
import { connect } from 'react-redux';

export class EditQuestion extends React.Component {
    render() {
        console.log(this.props.question)
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        question: state.questions.find(question => question._id === props.match.params.id)
    }
};

export default connect(mapStateToProps)(EditQuestion);