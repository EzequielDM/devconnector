import "./App.css";

import * as React from "react";
// * REDUX
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { loadUser } from "./actions/auth";
import ActionTypes from "./actions/types";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Alert from "./components/layout/Alert";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { useEffect } from "react";
import PrivateRoute from "./components/routing/PrivateRoute";
import ProfileForm from "./components/profile/ProfileForm";

const App = () => {
  useEffect(() => {
    if (localStorage.token) setAuthToken(localStorage.token);
    store.dispatch(loadUser() as any);

    window.addEventListener("storage", () => !localStorage.token && store.dispatch({ type: ActionTypes.LOGOUT }));
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/profile/create" component={ProfileForm} />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
};

export default App;
