import React from 'react';
import { withRouter } from 'react-router-dom';

import {RaisedButton} from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';

const LinkButton = ({ history }) => (
  <RaisedButton
    label="After"
    labelPosition="before"
    primary={true}
    onClick={() => {
      console.log(history.location.pathname)
      //history.push('/:id/questions')}
    }}
    icon={<AddIcon/>}
  />
);


export default withRouter(LinkButton);