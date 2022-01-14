import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  faCode,
  faNewspaper,
  faSignOutAlt,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { logout } from "../../actions/auth";
import { RootState } from "../../reducers";

const Navbar = () => {
  const dispatch = useDispatch();

  const avatar = useSelector((state: RootState) => state.auth.user?.avatar);
  const _id = useSelector((state: RootState) => state.auth.user?._id);

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
        <Link to="/posts">
          <FontAwesomeIcon icon={faNewspaper} fixedWidth /> <span className="hide-sm">Posts</span>
        </Link>
      </li>
      <li>
        <a onClick={() => dispatch<any>(logout())} href="#!">
          <FontAwesomeIcon icon={faSignOutAlt} /> <span className="hide-sm">Logout</span>
        </a>
      </li>
      <li>
        <Link to={`/profile/${_id}`} style={{ padding: "0px", margin: "0px" }}>
          <img src={avatar} alt="Profile in navbar" className="round-img navbar-pfp" />
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <Link to="/profiles">
        <FontAwesomeIcon icon={faUsers} fixedWidth /> <span className="hide-sm">Developers</span>
      </Link>
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
