import * as React from "react";
import { Observable } from "rx-lite-dom";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from "material-ui/Card";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { Route, IndexRoute, Switch, Router, Link } from "react-router-dom";
import { BelowAppBar } from "../../shared/routes";
import { connect } from "react-refetch";
import { List } from "../../components/workers/worker.list";
import { Graphs } from "../../components/graphs/graphs";
import DashboardTAB from "../../components/tabs/tabs";
declare const fetch: any;
import { InsertComponent } from "../../components/insert/insert"
const css = require('./dashboard.pcss');

class DashboardComponent extends React.Component<any, any> {
    context: any;
    static contextTypes = { router: React.PropTypes.object };


    constructor(props) {
        super(props);
    }


    render() {
        return <div>
            <Route component={DashboardTAB} />
            <Route path="/dashboard/graphs" component={Graphs} />
            <Route path="/dashboard/workers" component={List} />
            <Route path="/dashboard/insert" component={InsertComponent} />
        </div>
    }
}


export default withStyles(css)(BelowAppBar(DashboardComponent));

