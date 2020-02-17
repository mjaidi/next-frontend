import React from "./node_modules/react";
import ReactDOM from "./node_modules/react-dom";
import Secret from "./index";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Secret />, div);
  ReactDOM.unmountComponentAtNode(div);
});
