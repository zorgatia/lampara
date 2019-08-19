import React, { useEffect, Fragment } from "react";
import {Link} from "react-router-dom"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCurrentProfile } from "../../actions/profile";

const Dashboard = ({
    getCurrentProfile,
    auth: { user },
    profile: { profile, loading }
}) => {
    useEffect(() => {
        getCurrentProfile();
    },[]);

    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <div className="content-body">
                <div className="container">
                    <div className="row page-titles">
                        <div className="col p-0">
                            <h4>
                                Hello, <span>Welcome here</span>
                            </h4>
                        </div>
                        <div className="col p-0">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/dashboard">Home</Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    Dashboard
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { getCurrentProfile }
)(Dashboard);
