import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Routes from "./components/routing/Routes";
import Login from "./components/auth/Login";


import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";



import "./App.css";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Routes />
                        
                    </Switch>

                </Fragment>
            </Router>
        </Provider>
    );
};
export default App;
