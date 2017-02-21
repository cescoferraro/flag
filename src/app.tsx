import * as React from "react";
import {createAsyncComponent} from "react-async-component";
import {Route, IndexRoute, Router, Switch, Link} from "react-router-dom";
import AppShell from "./components/shell/shell";
import {AsyncDashboard} from "./containers/dashboard/async";
import {AsyncLogin} from "./containers/login/async";
import {ProgressBar} from "./components/progress/progress";
import {BellowAppShell} from "./shared/bellow.decorator";


export default ({userAgent}) => {
    //noinspection TypeScriptUnresolvedVariable
    return (
        <div>
            <Route component={AppShell}/>
            <Route component={ProgressBar}/>

            <Route exact path="/" component={AsyncLogin(userAgent)}/>
            <Switch>
                <Route path="/dashboard" component={AsyncDashboard(userAgent)}/>
                <Route component={NoMatch}/>
            </Switch>
        </div>)
}

const NoMatch = BellowAppShell()(({location}) => <h3>No match for <code>{location.pathname}</code></h3>);
