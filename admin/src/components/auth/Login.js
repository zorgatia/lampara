import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;
    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    };

    //redirect if authenficated
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Fragment>
            <div className="login-bg h-100">
                <div className="container h-100">
                    <div className="row justify-content-center h-100">
                        <div className="col-xl-6">
                            <div className="form-input-content">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="logo text-center">
                                            {/*<a href="index.html">
                                        <img src="../../assets/images/f-logo.png" alt="">
    </a>*/}
                                        </div>
                                        <h4 className="text-center m-t-15">
                                            Log into Your Account
                                        </h4>
                                        <form
                                            className="m-t-30 m-b-30"
                                            onSubmit={e => onSubmit(e)}
                                        >
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Email"
                                                    name="email"
                                                    value={email}
                                                    onChange={e => onChange(e)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    name="password"
                                                    minLength="6"
                                                    value={password}
                                                    onChange={e => onChange(e)}
                                                />
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <div className="form-check p-l-0">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="basic_checkbox_1"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="basic_checkbox_1"
                                                        >
                                                            Check me out
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-6 text-right">
                                                    <a href="#">
                                                        Forgot Password?
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="text-center m-b-15 m-t-15">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                >
                                                    Sign in
                                                </button>
                                            </div>
                                        </form>

                                        {/*
                                <div className="text-center">
                                    <h5 className="m-b-30">Or with Login</h5>
                                    <ul className="list-inline">
                                        <li className="list-inline-item m-t-10"><a href="#" className="btn btn-facebook"><i className="fa fa-facebook"></i></a>
                                        </li>
                                        <li className="list-inline-item m-t-10"><a href="#" className="btn btn-twitter"><i className="fa fa-twitter"></i></a>
                                        </li>
                                        <li className="list-inline-item m-t-10"><a href="#" className="btn btn-linkedin"><i className="fa fa-linkedin"></i></a>
                                        </li>
                                        <li className="list-inline-item m-t-10"><a href="#" className="btn btn-google-plus"><i className="fa fa-google-plus"></i></a>
                                        </li>
                                    </ul>
                                    <p className="m-t-30">Dont have an account?<Link to="/register">Sign Up</Link>
                                    </p>
                                </div>
                                */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { login }
)(Login);
