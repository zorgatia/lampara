import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PlageItem from "./PlageItem";
import { getPlages } from "../../actions/plage";
import {Link} from "react-router-dom"

const Plages = ({ getPlages, plage: { plages, loading } }) => {
  useEffect(() => {
    getPlages();
  }, [getPlages]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="content-body">
        <div className="container">
          <div className="row page-titles">
            <div className="col p-0">
              <h4>
                Hello, <span>Welcome to plages</span>
              </h4>
            </div>
            <div>
                <Link to="/addplage"> Add </Link>
            </div>
          </div>

          {/* PlageItem */}
          <div className="row">
            {plages.map(plage => (
              <PlageItem key={plage._id} plage={plage} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Plages.propTypes = {
  getPlages: PropTypes.func.isRequired,
  plage: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  plage: state.plage
});

export default connect(
  mapStateToProps,
  { getPlages }
)(Plages);
