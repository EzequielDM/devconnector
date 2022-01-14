import { Redirect, Route } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/index";

const PrivateRoute = ({ path, component: Component }: any) => {
  const { isAuthenticated, isLoading, user } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated && !isLoading && user && user.role === "admin")
    return <Route exact path={path} render={(props: any) => <Component {...props} />} />;
  else if (!isAuthenticated && !isLoading) return <Redirect to="/login" />;
  else return <></>; //you can put a loading thing here.
};

export default PrivateRoute;
