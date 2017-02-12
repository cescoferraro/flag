import * as React from "react";
import { createAsyncComponent } from "react-async-component";
import { Route, IndexRoute, Router, Switch, Link } from "react-router-dom";
import AppShell from "./components/shell/shell";
import { AsyncLogin } from "./containers/login/async";
import { AsyncDashboard } from "./containers/dashboard/async";
import { List } from "./components/workers/worker.list";
import TabsExampleSimple from "./components/tabs/tabs"
import { BelowAppBar } from "./shared/routes";

export default ({userAgent}) => {
    return (
        <div>
            <Route component={AppShell} />
            <Switch>
                <Route exact path="/" component={AsyncLogin(userAgent)} />
                <Route path="/dashboard" component={AsyncDashboard(userAgent)} />
                <Route component={NoMatch} />
            </Switch>
        </div>)
}

const NoMatch = ({ location }) => (
    <div style={{ height: "calc( 100vh - 64px)" }} >
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
);
