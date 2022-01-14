import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebook, faLinkedin, faYoutube, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import { RootState } from "../../reducers";
import { IProfile } from "../../actions/types";

interface Props {
  profile: IProfile;
}

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar, role },
  },
}: Props) => {
  const isLoading = useSelector((state: RootState) => state.profile.loading);

  if (isLoading) return <Spinner />;

  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt={`Profile for ${name}`} />
      <h1 className="large">
        {name} {role === "admin" && <p className="badge badge-danger">Staff member</p>}
      </h1>
      <p className="lead">
        {status}
        {company && ` at ${company}`}
      </p>
      <p>{location}</p>
      <div className="icons my-1">
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGlobe} size="2x" />
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileTop;
