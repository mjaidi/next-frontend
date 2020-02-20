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

    render() {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        fullStore.dispatch(actions.clear());
      } else {
        const tokenFromStorage =
          typeof window !== "undefined"
            ? localStorage.getItem("tokenExpDate")
            : null;
        const tokenExpDate = new Date(tokenFromStorage);
        // if token hasn't expired
        if (tokenExpDate > new Date()) {
          fullStore.dispatch(actions.setLoggedIn());
          fullStore.dispatch(actions.setToken());
        } else {
          fullStore.dispatch(actions.clear());
        }
      }
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
