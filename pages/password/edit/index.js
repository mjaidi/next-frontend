import React from "react";
import RegistrationForm from "components/RegistrationForm";
import requireNotLoggedIn from "higher_order_components/requireNotLoggedIn";

const ResetPassword = () => <RegistrationForm formType="ResetPassword" />;

export default requireNotLoggedIn(ResetPassword);
