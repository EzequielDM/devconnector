import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileByID } from "../../actions/profile";
import { RootState } from "../../reducers";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
const Profile = ({ match }: any) => {
  const dispatch = useDispatch();

  const { profile, loading } = useSelector((state: RootState) => state.profile);
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getProfileByID(match.params.id) as any);
  }, [dispatch, match.params.id]);

  if (profile == null || loading) return <Spinner />;

  return (
    <>
      <Link to="/profiles" className="btn btn-light">
        Back to profiles
      </Link>
      {auth.isAuthenticated && auth.user && auth.user._id === profile.user._id && (
        <Link to="/profile/edit" className="btn btn-dark">
          Edit profile
        </Link>
      )}

      <div className="profile-grid my-1">
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
      </div>
    </>
  );
};

export default Profile;
