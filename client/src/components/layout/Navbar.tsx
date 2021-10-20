import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { faCode, faSignOutAlt, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { logout } from "../../actions/auth";
import { RootState } from "../../reducers";

const Navbar = () => {
  const dispatch = useDispatch();

  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <FontAwesomeIcon icon={faUser} fixedWidth /> <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/profiles">
          <FontAwesomeIcon icon={faUsers} fixedWidth /> <span className="hide-sm">Profiles</span>
        </Link>
      </li>
      <li>
        <a onClick={() => dispatch<any>(logout())} href="#!">
          <FontAwesomeIcon icon={faSignOutAlt} /> <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  const { isLoading, isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <FontAwesomeIcon icon={faCode} /> <span className="hide-sm">DevConnector</span>
        </Link>
      </h1>
      {!isLoading && <>{isAuthenticated ? authLinks : guestLinks}</>}
    </nav>
  );
};

export default Navbar;
