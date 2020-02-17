import React, { useEffect } from "react";
import { connect } from "react-redux";
import RegistrationForm from "components/RegistrationForm";
import Router from "next/router";

const NewPassword = ({ isLoggedIn }) => {
  useEffect(() => {
    if (isLoggedIn) {
      Router.push("/");
    }
  });
  return <RegistrationForm formType="NewPassword" />;
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps)(NewPassword);
