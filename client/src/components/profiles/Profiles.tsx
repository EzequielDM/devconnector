import { faConnectdevelop } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../../actions/profile";
import { RootState } from "../../reducers";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";

const Profiles = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  const isLoading = useSelector((state: RootState) => state.profile.loading);

  const profiles = useSelector((state: RootState) => state.profile.profiles);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <FontAwesomeIcon icon={faConnectdevelop} /> Browse and connect with other developers
          </p>

          <div className="profiles">
            {profiles.length > 0 ? profiles.map((profile) => <ProfileItem key={profile._id} profile={profile} />) : <h4>No profiles found</h4>}
          </div>
        </>
      )}
    </>
  );
};

export default Profiles;
