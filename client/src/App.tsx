import * as React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// * REDUX
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <>
                    <Navbar />
                    <Route exact path="/" component={Landing} />
                    <section className="container">
                        <Switch>
                            <Route
                                exact
                                path="/register"
                                component={Register}
                            />
                            <Route exact path="/login" component={Login} />
                        </Switch>
                    </section>
                </>
            </Router>
        </Provider>
    );
};

export default App;
