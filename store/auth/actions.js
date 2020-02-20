import { ApiService, BASE_URL } from "services/Api";
import { actionTypes } from "./actionTypes";

import { authStorage } from "utils/localStorage";
import snackbarActions from "store/snackbars/actions";

const client = new ApiService({ baseURL: BASE_URL });

const action = (type, payload) => ({ type, payload });

const actions = {
  login: values => {
    return dispatch => {
      return client
        .post(`/login`, {
          email: values.email,
          password: values.password
        })
        .then(res => {
          console.log(res);
          authStorage.persist(res.data.user, res.data.token, 6000);
          dispatch(action(actionTypes.SET_TOKEN, null));
          dispatch(
            action(actionTypes.LOGIN, {
              user: res.data.user,
              isLoggedIn: true
            })
          );
          dispatch(
            snackbarActions.newMessage({
              message: "You have successfully logged in",
              type: "success"
            })
          );
        });
    };
  },
  signUp: values => {
    return dispatch => {
      return client
        .post(`/signup`, {
          email: values.email,
          password: values.password
        })
        .then(res => {
          dispatch(actions.login(values));
        });
    };
  },
  newPassword: values => {
    return dispatch => {
      return client
        .post(`/password`, {
          email: values.email
        })
        .then(res => {
          dispatch(
            snackbarActions.newMessage({
              message: "Email password reset instructions successfuly sent",
              type: "success"
            })
          );
        });
    };
  },
  resetPassword: values => {
    return dispatch => {
      return client
        .patch(`/password`, {
          password: values.password,
          reset_password_token: values.token
        })
        .then(res => {
          dispatch(
            snackbarActions.newMessage({
              message:
                "Your password has been successfuly updated, please login to continue",
              type: "success"
            })
          );
        });
    };
  },
  logout: () => {
    return dispatch => {
      authStorage.clear();
      dispatch(action(actionTypes.LOGOUT));
      dispatch(
        snackbarActions.newMessage({
          message: "You have successfully logged out",
          type: "success"
        })
      );
    };
  },
  clear: () => {
    return dispatch => {
      typeof window !== "undefined" ? authStorage.clear() : null;
      dispatch(action(actionTypes.LOGOUT));
    };
  },
  setLoggedIn: (payload = {}) => ({ type: actionTypes.SET_LOGGED_IN, payload }),
  setToken: (payload = {}) => ({ type: actionTypes.SET_TOKEN, payload })
};

export default actions;
