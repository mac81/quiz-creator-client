import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

// Actions
import * as Actions from 'actions/questions';

// Selectors
import { SELECTORS } from 'reducers/questions';

class NodeSidebar extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    const { questions, match } = this.props;

    return (
      <aside className="node-sidebar-container">
        <div className="node-sidebar-header">Questions</div>
        <ul className="node-sidebar-tree">
          {questions && questions.map(question => (
            <li key={question._id}>
              <Link to={`${match.url}/questions/${question._id}`}>{question.label}</Link>
            </li>
          ))}
        </ul>
      </aside>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    questions: SELECTORS.getQuestions(state)
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NodeSidebar);