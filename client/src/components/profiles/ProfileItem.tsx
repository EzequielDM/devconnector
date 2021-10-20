import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}: any) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt={`Profile of ${name}`} className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill: any, index: any): any => (
          <li key={index} className="text-primary">
            <FontAwesomeIcon icon={faCheck} /> {skill.length > 10 ? `${skill.slice(0, 10)}...` : skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
