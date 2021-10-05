import './App.css';

import * as React from 'react';
// * REDUX
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import store from './store';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <>
                    <Navbar />
                    <Route exact path="/" component={Landing} />
                    <section className="container">
                        <Alert />
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
