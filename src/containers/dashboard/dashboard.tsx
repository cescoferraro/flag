import * as React from "react";
import { Observable } from "rx-lite-dom";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from "material-ui/Card";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { Route, IndexRoute, Switch, Router, Link } from "react-router-dom";
import { BelowAppBar } from "../../shared/routes";
import { connect } from "react-refetch";
import { List } from "../../components/workers/worker.list";
import DashboardTAB from "../../components/tabs/tabs";
declare const fetch: any;

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
            <Route path="/dashboard/cart" component={() => (<h2>CART!</h2>)} />
            <Route path="/dashboard/list" component={List} />
        </div>
    }
}


export default withStyles(css)(BelowAppBar(DashboardComponent));

