import { actionTypes } from "./actionTypes";

const action = (type, payload) => ({ type, payload });

const actions = {
  newMessage: message => {
    return (dispatch, getState) => {
      dispatch(action(actionTypes.NEW_MESSAGE, message));
      if (getState().snackbars.open) {
        dispatch(action(actionTypes.CLOSE));
      } else {
        dispatch(action(actionTypes.PROCESS_MESSAGES));
      }
    };
  },
  processMessages: () => {
    return dispatch => dispatch(action(actionTypes.PROCESS_MESSAGES));
  },
  close: () => {
    return dispatch => dispatch(action(actionTypes.CLOSE));
  }
};

export default actions;
