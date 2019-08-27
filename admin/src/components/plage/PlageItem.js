import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom"

import { connect } from "react-redux";
import { getCurrentPlage } from "../../actions/plage"

const PlageItem = ({ getCurrentPlage, plage: { _id, nom, ville, date, mainImage } }) => {
    const onClick = (e) => {
        //console.log('asdasdasd')
        getCurrentPlage(_id)
    }
    return (
        <div className="col-lg-4 no-card-border">
            <div className="card">
                <Link to="/addplage">
                    <img
                        src={mainImage}
                        className="img-fluid"
                        alt=""
                        onClick={e=>onClick(e)}
                    />
                    <div className="card-body">
                        <h5 className="m-b-0">{nom}</h5>
                        <div>
                            <span className="f-s-12 text-muted">{ville}</span>{" "}
                            <span className="p-l-10 p-r-10 text-muted">|</span>{" "}
                            <span className="f-s-12 text-muted">
                                Last update: 15 April 2018
                            </span>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="row justify-content-between">
                            <div className="col-4">
                                <h6 className="m-b-0">7,568 USD</h6>
                                <span className="text-muted">Sales</span>
                            </div>
                            <div className="col-4">
                                <h6 className="m-b-0">7,568 USD</h6>
                                <span className="text-muted">Sales</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

PlageItem.propTypes = {
    plage: PropTypes.object.isRequired,
    getCurrentPlage:PropTypes.func.isRequired,
};


export default connect(
    null,
    {getCurrentPlage}
)(PlageItem);
