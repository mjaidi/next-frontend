import { ApiService, BASE_API_URL } from "services/Api";
import { actionTypes } from "./actionTypes";

const client = new ApiService({ baseURL: BASE_API_URL });

const action = (type, payload) => ({ type, payload });

const actions = {
  getMessage: () => {
    return dispatch => {
      return client.get(`/secret`).then(res => {
        dispatch(action(actionTypes.SET_MESSAGE, res.data.message));
      });
    };
  }
};

export default actions;
