import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "next/router";
import { isAuthorizedRoute } from "utils/auth_roles";

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (
        !this.props.isLoggedIn ||
        !isAuthorizedRoute(Router.pathname, this.props.role)
      ) {
        Router.replace("/");
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      isLoggedIn: state.auth.isLoggedIn,
      role: state.auth.user ? state.auth.user.role : null
    };
  }

  return connect(mapStateToProps)(ComposedComponent);
};
