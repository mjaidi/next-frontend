import React, { useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "components/navigation/Navbar";
import actions from "store/admin/actions";
import Router from "next/router";

const Admin = ({ message, getMessage, isLoggedIn }) => {
  useEffect(() => {
    if (!isLoggedIn) {
      Router.push("/");
    } else {
      getMessage();
    }
  });
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
  message: state.admin.message,
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
