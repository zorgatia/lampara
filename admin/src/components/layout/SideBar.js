import React, { Fragment } from "react";
import {Link} from 'react-router-dom'

const SideBar = () => {
    return (
        <Fragment>
            <div className="nk-sidebar">
                <div className="nk-nav-scroll">
                    <ul className="metismenu" id="menu">
                        <li className="nav-label">Main</li>
                        <li>
                            <Link to="/dashboard">
                                <i className=" mdi mdi-view-dashboard" />{" "}
                                <span className="nav-text">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile">
                                <i className=" mdi mdi-view-dashboard" />{" "}
                                <span className="nav-text">Mon profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/securite">
                                <i className=" mdi mdi-view-dashboard" />{" "}
                                <span className="nav-text">Securite</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/bouee">
                                <i className=" mdi mdi-view-dashboard" />{" "}
                                <span className="nav-text">Bouee</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/plages">
                                <i className=" mdi mdi-view-dashboard" />{" "}
                                <span className="nav-text">Plages</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/plage">
                                <i className=" mdi mdi-view-dashboard" />{" "}
                                <span className="nav-text">Utilisateur</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/plage">
                                <i className=" mdi mdi-view-dashboard" />{" "}
                                <span className="nav-text">Historique</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/plage">
                                <i className=" mdi mdi-view-dashboard" />{" "}
                                <span className="nav-text">Ecosystem</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Fragment>
    );
};

export default SideBar;
