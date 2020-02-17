import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

const isProd = process.env.NODE_ENV === "production";
const middlewareList = [];

middlewareList.push(thunk);
if (!isProd) {
  middlewareList.push(logger);
}
const reduxDevtools =
  typeof window !== "undefined" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers = reduxDevtools || compose;

const middleware = composeEnhancers(applyMiddleware(...middlewareList));

export default middleware;
