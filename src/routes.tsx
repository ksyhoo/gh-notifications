import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import loadable from "@loadable/component";

const Router = {
  Landing: loadable(() => import("./pages/landing")),
  Auth: loadable(() => import("./pages/auth"))
};

export const Routes = () => (
  <>
    <BrowserRouter>
      <Route path="/" component={Router.Landing} />
      <Route path="/auth" exact component={Router.Auth} />
    </BrowserRouter>
  </>
);
