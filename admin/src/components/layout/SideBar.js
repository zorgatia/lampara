import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <Fragment>
      <div className="nk-sidebar" style={{top: '0px'}}>
        <div className="nk-nav-scroll">
          <ul className="metismenu" id="menu">
            
            
            <div className="brand-logo">
                        <Link to="/dashboard">
                                <img
                                    src="Lamparalogo.png"
                                    alt=""
                                    style={{maxWidth: '150px' , marginTop: '-2px' }}
                                    
                                />
                        </Link>
                    </div>
            <li className="nav-label">Main</li>
            <li>
              <Link to="/dashboard">
                <i className=" mdi mdi-view-dashboard" />{" "}
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/map">
                <i className=" mdi mdi-view-dashboard" />{" "}
                <span className="nav-text">Map</span>
              </Link>
            </li>
            <li>
              <Link to="/buoys">
                <i className=" mdi mdi-view-dashboard" />{" "}
                <span className="nav-text">Buoys</span>
              </Link>
            </li>
            <li>
              <Link to="/beaches">
                <i className=" mdi mdi-view-dashboard" />{" "}
                <span className="nav-text">Beaches</span>
              </Link>
            </li>

            <li>
              <Link to="/alert">
                <i className=" mdi mdi-view-dashboard" />{" "}
                <span className="nav-text">Alerts</span>
              </Link>
            </li>

            <li>
              <Link to="/test">
                <i className=" mdi mdi-view-dashboard" />{" "}
                <span className="nav-text">EcoSystem</span>
              </Link>
            </li>

            <li className="nav-label">Profile</li>
            <li>
              <Link to="/profile">
                <i className=" mdi mdi-view-dashboard" />{" "}
                <span className="nav-text">My Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/collaborators">
                <i className=" mdi mdi-view-dashboard" />{" "}
                <span className="nav-text">Collaborators</span>
              </Link>
            </li>
            <li>
              <Link to="/test">
                <i className=" mdi mdi-view-dashboard" />{" "}
                <span className="nav-text">Test</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default SideBar;
