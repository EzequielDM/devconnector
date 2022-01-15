import PrivateRoute from "./PrivateRoute";
import { Route, Switch } from "react-router-dom";
import Alert from "../layout/Alert";
import AdminRoute from "./AdminRoute";
import ProfileForm from "../profile-forms/ProfileForm";
import Dashboard from "../dashboard/Dashboard";
import Profiles from "../profiles/Profiles";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ProfileDelete from "../profile-forms/ProfileDelete";
import AddExperience from "../profile-forms/ExperienceForm";
import AddEducation from "../profile-forms/EducationForm";
import Posts from "../posts/Posts";
import Post from "../posts/PostItem";
import Profile from "../profile/Profile";
import NotFound from "../layout/NotFound";

const Routes = () => {
  return (
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
        <PrivateRoute exact path="/posts/:id" component={(props: any) => <Post {...props} />} />
        <Route exact path="/profile/:id" component={(props: any) => <Profile {...props} />} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
