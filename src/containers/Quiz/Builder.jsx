import React from 'react';
import {connect} from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { SELECTORS } from 'reducers/quiz';
import {bindActionCreators} from 'redux';

import * as QuestionActions from 'actions/questions';

// Containers
import Quiz from 'containers/Quiz';
import CreateQuestion from 'containers/CreateQuestion';
import EditQuestion from 'containers/EditQuestion';

// Components
import NodeSidebar from 'components/NodeSidebar';
import LinkButton from 'components/Linkbutton';

class Builder extends React.Component {

  componentDidMount() {
    this.props.questionActions.loadQuestions(this.props.match.params.id);
  }

  render() {

    const { match, questions } = this.props;

    if(questions && questions.length) {
      // console.log(questions[0]);
      // return (
      //   <Redirect to={`/${match.params.id}/questions/${questions[0]}`}/>
      // )
    }

    return (
      <div className="node-container">
        <NodeSidebar match={this.props.match} />
        <div className="node-details-container">
          <div className="node-details-view">
            <LinkButton
              label="Before"
              insertPosition="before"
            />
            <Switch>
              <Route exact path="/:id/questions" component={Quiz}/>
              <Route exact path="/:id/questions/new-question" component={CreateQuestion}/>
              <Route exact path="/:id/questions/:question_id" component={EditQuestion}/>
            </Switch>
            <LinkButton
              label="After"
              insertPosition="after"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    questions: SELECTORS.getQuizQuestions(state)
  }
};

const mapDispatchToProps = dispatch => ({
  questionActions: bindActionCreators(QuestionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Builder);

