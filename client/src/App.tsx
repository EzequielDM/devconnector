import "./App.css";

// * REDUX
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { loadUser } from "./actions/auth";
import ActionTypes from "./actions/types";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { useEffect } from "react";
import Routes from "./components/routing/Routes";

const App = () => {
  useEffect(() => {
    if (localStorage.token) setAuthToken(localStorage.token);
    store.dispatch(loadUser() as any);

    window.addEventListener(
      "storage",
      () => !localStorage.token && store.dispatch({ type: ActionTypes.LOGOUT })
    );
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
};

export default App;
