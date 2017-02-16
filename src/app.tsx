import * as React from "react";
import {createAsyncComponent} from "react-async-component";
import {Route, IndexRoute, Router, Switch, Link} from "react-router-dom";
import AppShell from "./components/shell/shell";
import Login from "./containers/login/login";
import {AsyncDashboard} from "./containers/dashboard/async";

export default ({userAgent}) => {
    return (
        <div>
            <Route component={AppShell}/>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/dashboard" component={AsyncDashboard(userAgent)}/>
                <Route component={NoMatch}/>
            </Switch>
        </div>)
}

const NoMatch = ({location}) => (
    <div style={{ height: "calc( 100vh - 64px)" }}>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
);
