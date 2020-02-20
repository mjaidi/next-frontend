import React from "react";
import RegistrationForm from "components/RegistrationForm";
import requireNotLoggedIn from "higher_order_components/requireNotLoggedIn";

const SignUpForm = () => <RegistrationForm formType="SignUp" />;

export default requireNotLoggedIn(SignUpForm);
