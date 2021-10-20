import { useSelector, useDispatch } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import { useEffect } from "react";
import { RootState } from "../../reducers/index";
import Spinner from "../layout/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Experience from "../profile-forms/Experience";
import DashboardActions from "./DashboardActions";
import Education from "../profile-forms/Education";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  const name = useSelector((state: RootState) => state.profile.profile?.user.name);
  const isAuthLoading = useSelector((state: RootState) => state.auth.isLoading);
  const isProfileLoading = useSelector((state: RootState) => state.profile.loading);
  const experience = useSelector((state: RootState) => state.profile.profile?.experience);
  const education = useSelector((state: RootState) => state.profile.profile?.education);

  const isNewUser = useSelector((state: RootState) => state.profile.profile?.status) === "Hey! I'm new to DevConnector";

  if (isProfileLoading || isAuthLoading) return <Spinner />;

  return (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <FontAwesomeIcon icon={faUser} /> <span>Welcome, {name}</span>
      </p>

      {isNewUser ? (
        <>
          <p className="text-warning">Seems like you haven't set up a profile yet.</p>
          <Link className="btn btn-primary my-1" to="/profile/edit">
            Create profile
          </Link>
        </>
      ) : (
        <>
          <DashboardActions />
          <Experience experience={experience as any} />
          <Education education={education as any} />

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => dispatch(deleteAccount())}>
              <FontAwesomeIcon icon={faUserMinus} fixedWidth /> <span>Delete account</span>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
