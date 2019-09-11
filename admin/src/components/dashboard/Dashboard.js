import React, { useEffect, Fragment,useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCurrentProfile } from "../../actions/profile";
import Pipep from "./Pipep";
import Linee from "./Linee";
import Top from "./Top";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {

    const [region, setRegion] = useState('Tunis')
  useEffect(() => {
    getCurrentProfile();
  }, []);

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
          </div>
          <Top></Top>
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <Pipep setRegion={setRegion}></Pipep>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <Linee region={region}></Linee>
                </div>
              </div>
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
