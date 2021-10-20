import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ProfileAbout = ({
  profile: {
    skills,
    bio,
    user: { name },
  },
}: any): any => {
  const isLoading = useSelector((state: RootState) => state.profile.loading);

  if (isLoading) return <Spinner />;

  return (
    <div className="profile-about bg-light p-2">
      <h2 className="text-primary">
        {name.trim().split(" ")[0].substring(-1) === "s" ? `${name.trim().split(" ")[0]}'` : `${name.trim().split(" ")[0]}'s`} Bio
      </h2>
      <p>{bio}</p>
      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {skills.slice(0, 6).map((skill: string, index: number) => (
          <div className="p-1" key={index}>
            <FontAwesomeIcon icon={faCheck} /> {skill.length > 14 ? `${skill.slice(0, 14)}...` : skill}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
