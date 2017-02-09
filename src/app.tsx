import * as React from "react";
import { createAsyncComponent } from "react-async-component";
import { Route, IndexRoute, Router, Switch, Link } from "react-router-dom";
import AppShell from "./components/shell/shell";
import { AsyncLogin } from "./containers/login/async";
import { AsyncDashboard } from "./containers/dashboard/async";
import { List } from "./components/workers/worker.list";
import TabsExampleSimple from "./components/tabs/tabs"

export default ({userAgent}) => {
    return (
        <div>
            <Route component={AppShell} />
            <Switch>
                <Route exact path="/" component={AsyncLogin(userAgent)} />
                <Route exact path="/login" component={AsyncLogin(userAgent)} />
                <Route path="/dashboard" component={AsyncDashboard(userAgent)} />
            </Switch>
        </div>)
}

