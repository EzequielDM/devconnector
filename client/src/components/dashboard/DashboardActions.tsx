import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faBlackTie } from "@fortawesome/free-brands-svg-icons";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/profile/edit" className="btn btn-light">
        <FontAwesomeIcon icon={faUserCircle} className="text-primary" /> Edit Profile
      </Link>
      <Link to="/profile/addexperience" className="btn btn-light">
        <FontAwesomeIcon icon={faBlackTie} className="text-primary" /> Add Experience
      </Link>
      <Link to="/profile/addeducation" className="btn btn-light">
        <FontAwesomeIcon icon={faGraduationCap} className="text-primary" /> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
