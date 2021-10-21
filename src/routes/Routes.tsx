import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingWrapper from "../components/LoadingWrapper";

import Navbar from "../components/Navbar";

const Home = lazy(() => import("../pages/HomePage"));
const Queues = lazy(() => import("../pages/QueuesPage"));
const Cards = lazy(() => import("../pages/CardsPage"));
const NotFound = lazy(() => import("../pages/NotFoundPage"));

const Routes = () => (
  <Router>
    <Suspense
      fallback={<LoadingWrapper loading>
        <></>
      </LoadingWrapper>}
    >
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/queues">
          <Queues />
        </Route>
        <Route exact path="/cards">
          <Cards />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Suspense>
  </Router>
);
export default Routes;
