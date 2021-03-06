import * as React from "react";
import {createAsyncComponent} from "react-async-component";
import {Route, IndexRoute, Router, Switch, Link} from "react-router-dom";
import AppShell from "./components/shell/shell";
import {AsyncDashboard} from "./containers/dashboard/async";
import {ProgressBar} from "./components/progress/progress";
import {LoginComponent} from "./containers/login/login";


export default ({userAgent}) => {
    //noinspection TypeScriptUnresolvedVariable
    return (
        <div>
            <Route component={AppShell}/>
            <Route component={ProgressBar}/>

            <Switch>
                <Route exact path="/" component={LoginComponent}/>
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
