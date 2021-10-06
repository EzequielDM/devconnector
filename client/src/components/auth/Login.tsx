import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(`Success logging in`);
  };

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

export default Login;
