import { useSelector, useDispatch } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { useEffect } from "react";
import { RootState } from "../../reducers/index";
import { profile } from "../../reducers/profile";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  const name = useSelector((state: RootState) => state.profile.profile?.user.name);

  return <div>Welcome, {name}</div>;
};

export default Dashboard;
