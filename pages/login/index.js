import React from "react";
import RegistrationForm from "components/RegistrationForm";
import requireNotLoggedIn from "higher_order_components/requireNotLoggedIn";

const SignInForm = () => <RegistrationForm formType="Login" />;

export default requireNotLoggedIn(SignInForm);
