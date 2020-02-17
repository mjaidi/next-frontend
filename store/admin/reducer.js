import { actionTypes } from "./actionTypes";

const getInitialState = () => ({
  message: null
});

const landing = (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case actionTypes.SET_MESSAGE:
      return { message: payload };
    default:
      return state;
  }
};

export default landing;
