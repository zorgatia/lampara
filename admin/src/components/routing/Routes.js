import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";


import SideBar from "../layout/SideBar";
import Dashboard from "../dashboard/Dashboard";
import Plages from "../plage/Plages";
import AddPlageForm from "../plage/AddPlageForm";
import EditPlageForm from "../plage/EditPlageForm";
import PrivateRoute from "../routing/PrivateRoute";
import Navbar from "../layout/Navbars";
import NotFound from "../layout/NotFound"
import Swal from "../layout/Swal"
import Profile from "../profile/Profile"
import Mapp from "../plage/Map"
import Nap from '../buoy/Nap'
import Members from "../member/Members"
import Test from "../plage/Test";
import Buoys from "../buoy/Buoys";



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
                <PrivateRoute exact path="/beaches" component={Plages} />
                <PrivateRoute exact path="/add-beach" component={AddPlageForm} />
                <PrivateRoute exact path="/edit-beach" component={EditPlageForm} />
                <PrivateRoute exact path="/map" component={Nap} />
                <PrivateRoute exact path="/collaborators" component={Members} />
                <PrivateRoute exact path="/buoys" component={Buoys} />
                <PrivateRoute exact path="/test" component={Test} />
                
                <Route component={NotFound} />
            </Switch>
            <Swal/>
            </div>
        </Fragment>
    );
};

export default Routes;
