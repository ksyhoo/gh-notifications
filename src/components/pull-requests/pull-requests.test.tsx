import React from "react";
import { shallow } from "enzyme";
import PullRequests from "./index";
it("renders without crashing", () => {
  shallow(<PullRequests />);
});
