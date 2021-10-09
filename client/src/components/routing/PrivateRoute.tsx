import { Redirect, Route } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/index";

const PrivateRoute = ({ path, component }: any) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  if (isAuthenticated && !isLoading) return <Route exact path={path} component={component} />;
  else if (!isAuthenticated && !isLoading) return <Redirect to="/login" />;
  else return <></>; //you can put a loading thing here.
};

export default PrivateRoute;
