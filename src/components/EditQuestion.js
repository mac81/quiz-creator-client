import React from 'react';
import { connect } from 'react-redux';

export class EditQuestion extends React.Component {
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
                            <td><input type="radio" name="correctAnswer" checked={item.correctAnswer}/></td>
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

export default connect(mapStateToProps)(EditQuestion);