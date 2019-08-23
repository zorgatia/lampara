import React, { Fragment } from "react";

export default () => (
  <Fragment>
    <div className="content-body">
      <div className="container">
        <div className="loader">
          <svg className="circular" viewBox="25 25 50 50">
            <circle
              className="path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              strokeWidth="3"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      </div>
    </div>
  </Fragment>
);
