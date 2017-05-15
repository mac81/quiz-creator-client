import actionTypes from 'actions/actionTypes';
import { push } from 'react-router-redux';

export const setStatus = (status, statusText) => {
    return {
      type: actionTypes.setStatus,
      status,
      statusText
    }
};
