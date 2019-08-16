import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";


import SideBar from "../layout/SideBar";
import Dashboard from "../dashboard/Dashboard";
import Plages from "../plage/Plages";
import PrivateRoute from "../routing/PrivateRoute";
import Navbar from "../layout/Navbars";
import NotFound from "../layout/NotFound"



const Routes = () => {
    return (
        <Fragment>
            <Navbar />
            <SideBar />
            <Switch>
                <Redirect exact from="/" to="/dashboard" />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/plages" component={Plages} />
                <Route component={NotFound} />
            </Switch>
            
        </Fragment>
    );
};

export default Routes;
