import React, { Fragment } from "react";
import { Link ,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import Spinner from "./Spinner";

const Navbars = ({ auth: { isAuthenticated, loading }, logout }) => {

    //redirect if authenficated
    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }



    return  loading ? <Spinner /> :(
        <Fragment>
            <div className="header" style={{zIndex: 9}}>
                <div className="nav-header" style={{textAlign:'left'}}>
                    
                   
                </div>
                <div className="header-content">
                    <div className="header-left">
                        <ul>
                            <li className="icons position-relative">
                                <Link to="!#">
                                    <i className="icon-magnifier f-s-16" />
                                </Link>
                                <div className="drop-down animated bounceInDown">
                                    <div className="dropdown-content-body">
                                        <div
                                            className="header-search"
                                            id="header-search"
                                        >
                                            <form action="#">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Search"
                                                    />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">
                                                            <i className="icon-magnifier" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="header-right">
                        <ul>
                            <li className="icons">
                                <Link to="!#">
                                    <i
                                        className="mdi mdi-bell f-s-18"
                                        aria-hidden="true"
                                    />
                                    <div className="pulse-css" />
                                </Link>
                                <div className="drop-down animated bounceInDown">
                                    <div className="dropdown-content-heading">
                                        <span className="text-left">
                                            Recent Notifications
                                        </span>
                                    </div>
                                    <div className="dropdown-content-body">
                                        <ul>
                                            <li>
                                                <Link to="#">
                                                    <img
                                                        className="pull-left m-r-10 avatar-img"
                                                        src="../../assets/images/avatar/1.jpg"
                                                        alt=""
                                                    />
                                                    <div className="notification-content">
                                                        <small className="notification-timestamp pull-right">
                                                            02:34 PM
                                                        </small>
                                                        <div className="notification-heading">
                                                            Mr. Dmitry
                                                        </div>
                                                        <div className="notification-text">
                                                            5 members joined
                                                            today
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <img
                                                        className="pull-left m-r-10 avatar-img"
                                                        src="../../assets/images/avatar/2.jpg"
                                                        alt=""
                                                    />
                                                    <div className="notification-content">
                                                        <small className="notification-timestamp pull-right">
                                                            02:34 PM
                                                        </small>
                                                        <div className="notification-heading">
                                                            Mariam
                                                        </div>
                                                        <div className="notification-text">
                                                            likes a photo of you
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <img
                                                        className="pull-left m-r-10 avatar-img"
                                                        src="../../assets/images/avatar/3.jpg"
                                                        alt=""
                                                    />
                                                    <div className="notification-content">
                                                        <small className="notification-timestamp pull-right">
                                                            02:34 PM
                                                        </small>
                                                        <div className="notification-heading">
                                                            Tasnim
                                                        </div>
                                                        <div className="notification-text">
                                                            Hi Teddy, Just
                                                            wanted to let you
                                                            ...
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <img
                                                        className="pull-left m-r-10 avatar-img"
                                                        src="../../assets/images/avatar/4.jpg"
                                                        alt=""
                                                    />
                                                    <div className="notification-content">
                                                        <small className="notification-timestamp pull-right">
                                                            02:34 PM
                                                        </small>
                                                        <div className="notification-heading">
                                                            Ishrat Jahan
                                                        </div>
                                                        <div className="notification-text">
                                                            Hi Teddy, Just
                                                            wanted to let you
                                                            ...
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li className="text-center">
                                                <Link to="#" className="more-link">
                                                    See All
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li className="icons">
                                <Link to="!#">
                                    <i
                                        className="mdi mdi-comment f-s-18"
                                        aria-hidden="true"
                                    />
                                    <div className="pulse-css" />
                                </Link>
                                <div className="drop-down animated bounceInDown">
                                    <div className="dropdown-content-heading">
                                        <span className="text-left">
                                            2 New Messages
                                        </span>
                                    </div>
                                    <div className="dropdown-content-body">
                                        <ul>
                                            <li className="notification-unread">
                                                <Link to="#">
                                                    <img
                                                        className="pull-left m-r-10 avatar-img"
                                                        src="../../assets/images/avatar/1.jpg"
                                                        alt=""
                                                    />
                                                    <div className="notification-content">
                                                        <small className="notification-timestamp pull-right">
                                                            02:34 PM
                                                        </small>
                                                        <div className="notification-heading">
                                                            Saiul Islam
                                                        </div>
                                                        <div className="notification-text">
                                                            Hi Teddy, Just
                                                            wanted to let you
                                                            ...
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li className="notification-unread">
                                                <Link to="#">
                                                    <img
                                                        className="pull-left m-r-10 avatar-img"
                                                        src="../../assets/images/avatar/2.jpg"
                                                        alt=""
                                                    />
                                                    <div className="notification-content">
                                                        <small className="notification-timestamp pull-right">
                                                            02:34 PM
                                                        </small>
                                                        <div className="notification-heading">
                                                            Ishrat Jahan
                                                        </div>
                                                        <div className="notification-text">
                                                            Hi Teddy, Just
                                                            wanted to let you
                                                            ...
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <img
                                                        className="pull-left m-r-10 avatar-img"
                                                        src="../../assets/images/avatar/3.jpg"
                                                        alt=""
                                                    />
                                                    <div className="notification-content">
                                                        <small className="notification-timestamp pull-right">
                                                            02:34 PM
                                                        </small>
                                                        <div className="notification-heading">
                                                            Saiul Islam
                                                        </div>
                                                        <div className="notification-text">
                                                            Hi Teddy, Just
                                                            wanted to let you
                                                            ...
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <img
                                                        className="pull-left m-r-10 avatar-img"
                                                        src="../../assets/images/avatar/4.jpg"
                                                        alt=""
                                                    />
                                                    <div className="notification-content">
                                                        <small className="notification-timestamp pull-right">
                                                            02:34 PM
                                                        </small>
                                                        <div className="notification-heading">
                                                            Ishrat Jahan
                                                        </div>
                                                        <div className="notification-text">
                                                            Hi Teddy, Just
                                                            wanted to let you
                                                            ...
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li className="text-center">
                                                <Link to="#" className="more-link">
                                                    See All
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li className="icons">
                                <Link to="!#">
                                    {" "}
                                    <i
                                        className="mdi mdi-crosshairs-gps f-s-18"
                                        aria-hidden="true"
                                    />
                                    <div className="pulse-css" />
                                </Link>
                                <div className="drop-down dropdown-task animated bounceInDown">
                                    <div className="dropdown-content-heading">
                                        <span className="text-left">
                                            Task Update
                                        </span>
                                    </div>
                                    <div className="dropdown-content-body">
                                        <ul>
                                            <li>
                                                <Link to="#">
                                                    <div className="notification-content">
                                                        <small className="notification-timestamp pull-right">
                                                            85% Complete
                                                        </small>
                                                        <div className="notification-heading">
                                                            Task One
                                                        </div>
                                                        <div className="progress">
                                                            <div
                                                                style={{ width : '85%' }}
                                                                aria-valuemax="100"
                                                                aria-valuemin="0"
                                                                aria-valuenow="85"
                                                                role="progressbar"
                                                                className="progress-bar progress-bar-success"
                                                            />
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <div className="notification-content">
                                                        <small className="notification-timestamp pull-right">
                                                            60% Complete
                                                        </small>
                                                        <div className="notification-heading">
                                                            Task Two
                                                        </div>
                                                        <div className="progress">
                                                            <div
                                                                style={{width: '60%'}}
                                                                aria-valuemax="100"
                                                                aria-valuemin="0"
                                                                aria-valuenow="60"
                                                                role="progressbar"
                                                                className="progress-bar progress-bar-primary"
                                                            />
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <div className="notification-content">
                                                        <small className="notification-timestamp pull-right">
                                                            25% Complete
                                                        </small>
                                                        <div className="notification-heading">
                                                            Task Three
                                                        </div>
                                                        <div className="progress">
                                                            <div
                                                                style={{width: '25%' }}
                                                                aria-valuemax="100"
                                                                aria-valuemin="0"
                                                                aria-valuenow="25"
                                                                role="progressbar"
                                                                className="progress-bar progress-bar-warning"
                                                            />
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <div className="notification-content">
                                                        <small className="notification-timestamp pull-right">
                                                            75% Complete
                                                        </small>
                                                        <div className="notification-heading">
                                                            Task Four
                                                        </div>
                                                        <div className="progress">
                                                            <div
                                                                style={{width: '75%' }}
                                                                aria-valuemax="100"
                                                                aria-valuemin="0"
                                                                aria-valuenow="75"
                                                                role="progressbar"
                                                                className="progress-bar progress-bar-danger"
                                                            />
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li className="text-center">
                                                <Link to="#" className="more-link">
                                                    See All
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li className="icons">
                                <Link to="/login" onClick={logout}>
                                    <i
                                        className="icon-power f-s-20"
                                        aria-hidden="true"
                                    />
                                </Link>
                                
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

Navbars.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logout }
)(Navbars);
