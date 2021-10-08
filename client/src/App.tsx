import "./App.css";

import * as React from "react";
// * REDUX
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import store from "./store";
import { useEffect } from "react";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import ActionTypes from "./actions/types";

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
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
};

export default App;
