import * as React from "react";
import {Route, IndexRoute, Switch, Router, Link} from "react-router-dom";
import {connect} from "react-redux";
import {List} from "../../components/workers/worker.table";
import {Graphs} from "../../components/graphs/graphs";
import {InsertComponent} from "../../components/insert/insert";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/cancel";
import {DashboardTAB} from "../../components/tabs/tabs";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import {AppActions} from "../../redux/actions";
import {BellowAppShell} from "../../shared/bellow.decorator";
const css = require('./dashboard.pcss');


@withStyles(css)
@BellowAppShell()
@connect((state) => ({app: state.app}), AppActions)
export class Dashboard extends React.Component<any, any> {

    componentDidMount() {
        let menuIcon =
            <IconButton onClick={()=>{
                this.props.replace("/");
                }}>
                <MoreVertIcon />
            </IconButton>;
        this.props.SET_APP_BAR_MENU(menuIcon);


    }

    componentWillUnmount() {
        this.props.SET_APP_BAR_MENU(null);
    }

    render() {
        return <div>
            <Route
                component={DashboardTAB}/>
            <Switch>
                <Route path="/dashboard/graphs"
                       component={Graphs}/>
                <Route path="/dashboard/workers"
                       component={List}/>
                <Route path="/dashboard/insert"
                       component={InsertComponent}/>
            </Switch>
        </div>


    }
}


