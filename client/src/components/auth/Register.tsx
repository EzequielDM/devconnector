import PropTypes from "prop-types";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

interface FormData {
    name: string;
    email: string;
    password: string;
    password2: string;
}

const Register = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = formData;

    const dispatch = useDispatch();

    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== password2)
            dispatch(setAlert("Passwords do not match", "danger", 3000));
        else {
            dispatch(register({ name, email, password }));
        }
    };

    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <FontAwesomeIcon icon={faUser} /> Create Your Account
            </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>
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
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image,
                        use a Gravatar email
                    </small>
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
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={onChange}
                        autoComplete="new-password"
                        minLength={6}
                        required
                    />
                </div>
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Register"
                />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign in</Link>
            </p>
        </>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func,
};

export default Register;
