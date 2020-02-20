import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "next/router";
export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (this.props.isLoggedIn) {
        Router.push("/");
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { isLoggedIn: state.auth.isLoggedIn };
  }

  return connect(mapStateToProps)(ComposedComponent);
};
