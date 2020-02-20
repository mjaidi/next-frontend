import React from "react";
import RegistrationForm from "components/RegistrationForm";
import requireNotLoggedIn from "higher_order_components/requireNotLoggedIn";

const NewPassword = () => <RegistrationForm formType="NewPassword" />;

export default requireNotLoggedIn(NewPassword);
