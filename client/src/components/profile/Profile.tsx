import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGithubRepos, getProfileByID } from "../../actions/profile";
import { RootState } from "../../reducers";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import ProfileRepo from "./ProfileRepo";

const Profile = ({ match }: any) => {
  const dispatch = useDispatch();

  const { profile, loading } = useSelector((state: RootState) => state.profile);
  const auth = useSelector((state: RootState) => state.auth);
  const ghub = useSelector((state: RootState) => state.profile.profile?.githubusername);
  const repos = useSelector((state: RootState) => state.profile.repos);

  useEffect(() => {
    dispatch(getProfileByID(match.params.id) as any);
    dispatch(getGithubRepos(ghub || "") as any);
  }, [dispatch, ghub, match.params.id]);

  if (profile == null || loading) return <Spinner />;

  return (
    <>
      <Link to="/profiles" className="btn btn-light">
        Go back
      </Link>
      {auth.isAuthenticated && auth.user && auth.user._id === profile.user._id && (
        <Link to="/profile/edit" className="btn btn-dark">
          Edit profile
        </Link>
      )}
      {auth.user?.role === "admin" && (
        <Link to={`/profile/edit/${profile.user._id}`} className="btn btn-warning">
          Manage user profile
        </Link>
      )}

      <div className="profile-grid my-1">
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {profile.experience && profile.experience.length > 0 ? (
            <>
              {profile.experience.map((exp) => (
                <ProfileExperience key={exp._id} experience={exp} />
              ))}
            </>
          ) : (
            <h4>No experience credentials</h4>
          )}
        </div>

        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {profile.education && profile.education.length > 0 ? (
            <>
              {profile.education.map((edu) => (
                <ProfileEducation key={edu._id} education={edu} />
              ))}
            </>
          ) : (
            <h4>No education credentials</h4>
          )}
        </div>

        <div className="profile-github">
          <h2 className="text-primary my-1">
            <FontAwesomeIcon icon={faGithub} /> GitHub Repos
          </h2>
          {repos &&
          repos
            .filter((repo) => repo.fork === false)
            .filter((repo) => repo.name !== profile.githubusername).length > 0 ? (
            repos
              .filter((repo) => repo.fork === false)
              .filter((repo) => repo.name !== profile.githubusername)
              .map((repo) => <ProfileRepo key={repo.id} repo={repo} />)
          ) : (
            <h4>
              {profile.githubusername ? profile.githubusername : profile.user.name} doesn't have any
              repositories.
            </h4>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
