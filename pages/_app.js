import { Provider } from "react-redux";
import App from "next/app";
import withRedux from "next-redux-wrapper";

import Snackbars from "components/Snackbars";
import fullStore from "store";
import actions from "store/auth/actions";
const makeStore = () => fullStore;

export default withRedux(makeStore, { debug: true })(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {})
        }
      };
    }
    componentDidMount() {
      const token = localStorage.getItem("token");
      if (!token) {
        fullStore.dispatch(actions.clear());
      } else {
        const tokenExpDate = new Date(localStorage.getItem("tokenExpDate"));
        // if token hasn't expired
        if (tokenExpDate > new Date()) {
          fullStore.dispatch(actions.setLoggedIn());
          fullStore.dispatch(actions.setToken());
        } else {
          fullStore.dispatch(actions.clear());
        }
      }
    }

    render() {
      const { Component, pageProps, store } = this.props;

      return (
        <Provider store={store}>
          <Snackbars />
          <Component {...pageProps} />
        </Provider>
      );
    }
  }
);
