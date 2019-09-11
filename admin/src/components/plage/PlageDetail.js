import React from "react";
import PropTypes from "prop-types";

const PlageDetail = ({plage}) => {
  return (
    <div className="content-body">
      <div className="container">
        <div className="row">
            <img src={plage.mainImage}></img>
            <span>Name: {plage.nom}</span>
        </div>
      </div>
    </div>
  );
};

PlageDetail.propTypes = {
    plage: PropTypes.object.isRequired,
};

export default PlageDetail;
