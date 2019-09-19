import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getPlage, loadPlage } from "../../actions/plage";
import { connect } from "react-redux";
import AddBuoy from "../buoy/AddBuoy";

const PlageItem = ({
  loadPlage,
  getPlage,
  plage: { _id, nom, ville, date, mainImage, buoys, region }
}) => {
  const onEdit = e => {
    //e.preventDefault()
    loadPlage();
    getPlage(_id);
    // console.log('asd')
  };
 // const onDetails = e => {};
  return (
    <div className="col-lg-4 no-card-border">
      <div className="card">
        <div className="position-relative">
          <img
            src={mainImage}
            className="img-thumbnail rounded float-left"
            alt=""
          />
          <div className="card-img-btn">
            <div className="btn btn-primary btn-sm">{ville}</div>
          </div>
        </div>
        <div className="card-body">
          <h5 className="m-b-0">{nom}</h5>
          <div>
            <span className="f-s-12 text-muted">{region}</span>{" "}
            <span className="p-l-10 p-r-10 text-muted">|</span>{" "}
            <span className="f-s-12 text-muted">{buoys.length} buoys</span>
          </div>
        </div>
        <div className="card-footer">
          <div className="row justify-content-end">
            <div className="col-4">
              <Link to="/edit-beach" className="btn" onClick={e => onEdit(e)}>
                Edit
              </Link>
            </div>
            <div className="col-4">
              <AddBuoy plage={_id}></AddBuoy>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PlageItem.propTypes = {
  plage: PropTypes.object.isRequired,
  getPlage: PropTypes.func.isRequired
};

export default connect(
  null,
  { getPlage, loadPlage }
)(PlageItem);
