import React, { useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "components/navigation/Navbar";
import actions from "store/secret/actions";
import Router from "next/router";
import { isAuthorizedRoute } from "utils/auth_roles";

const Secret = ({ message, getMessage, isLoggedIn, role }) => {
  useEffect(() => {
    if (!isLoggedIn || !isAuthorizedRoute(Router.pathname, role)) {
      Router.replace("/");
    } else {
      getMessage();
    }
  }, []);
  return (
    <div>
      <Navbar />
      {message}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  getMessage: () => dispatch(actions.getMessage())
});

const mapStateToProps = state => ({
  message: state.secret.message,
  isLoggedIn: state.auth.isLoggedIn,
  role: state.auth.user ? state.auth.user.role : null
});

export default connect(mapStateToProps, mapDispatchToProps)(Secret);
