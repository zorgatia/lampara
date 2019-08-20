import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";


import SideBar from "../layout/SideBar";
import Dashboard from "../dashboard/Dashboard";
import Plages from "../plage/Plages";
import PrivateRoute from "../routing/PrivateRoute";
import Navbar from "../layout/Navbars";
import NotFound from "../layout/NotFound"
import Swal from "../layout/Swal"
import Profile from "../profile/Profile"
import Mapp from "../plage/Map"



const Routes = () => {
    return (
        <Fragment>
            <div className="show">
            <Navbar />
            <SideBar />
            <Switch>
                <Redirect exact from="/" to="/dashboard" />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/plages" component={Plages} />
                <PrivateRoute exact path="/map" component={Mapp} />
                <Route component={NotFound} />
            </Switch>
            <Swal/>
            </div>
        </Fragment>
    );
};

export default Routes;
