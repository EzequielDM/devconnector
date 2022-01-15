import "./App.css";

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
import AdminRoute from "./components/routing/AdminRoute";
import ProfileForm from "./components/profile-forms/ProfileForm";
import AddExperience from "./components/profile-forms/ExperienceForm";
import AddEducation from "./components/profile-forms/EducationForm";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import ProfileDelete from "./components/profile-forms/ProfileDelete";
import Posts from "./components/posts/Posts";
import Post from "./components/posts/Post";
import NotFound from "./components/layout/NotFound";

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
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <AdminRoute
                exact
                path="/profile/edit/:id"
                component={(props: any) => <ProfileForm admin={true} {...props} />}
              />
              <AdminRoute
                exact
                path="/profile/delete/:id"
                component={(props: any) => <ProfileDelete {...props} />}
              />
              <PrivateRoute exact path="/profile/edit" component={ProfileForm} />
              <PrivateRoute exact path="/profile/addexperience" component={AddExperience} />
              <PrivateRoute
                exact
                path="/profile/experience/:id"
                component={(props: any) => <AddExperience {...props} />}
              />
              <PrivateRoute exact path="/profile/addeducation" component={AddEducation} />
              <PrivateRoute
                exact
                path="/profile/education/:id"
                component={(props: any) => <AddEducation {...props} />}
              />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute
                exact
                path="/posts/:id"
                component={(props: any) => <Post {...props} />}
              />
              <Route exact path="/profile/:id" component={(props: any) => <Profile {...props} />} />
              <Route component={NotFound} />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
};

export default App;
