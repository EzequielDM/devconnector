import PropTypes from "prop-types";
import { ChangeEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { login } from "../../actions/auth";
import { RootState } from "../../reducers/index";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  if (useSelector((state: RootState) => state.auth.isAuthenticated)) return <Redirect to="/dashboard" />;

  return (
    <>
      <h1 className="large text-primary">Sign in</h1>
      <p className="lead">
        <FontAwesomeIcon icon={faUser} /> Log in to your account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            autoComplete="username"
            value={email}
            onChange={onChange}
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            autoComplete="new-password"
            minLength={6}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Register now</Link>
      </p>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func,
};

export default Login;
