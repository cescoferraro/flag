import * as React from "react";
import {Observable} from "rx-lite-dom";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import {Route, IndexRoute, Switch, Router, Link} from "react-router-dom";
import {BelowAppBar} from "../../shared/routes";
import {connect} from "react-redux";
import {List} from "../../components/workers/worker.list";
import {Graphs} from "../../components/graphs/graphs";
import {InsertComponent} from "../../components/insert/insert";
import {bindActionCreators} from "redux";
import {SET_APP_BAR_MENU} from "../../actions/app";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/cancel";
import {DashboardTAB} from "../../components/tabs/tabs";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import SizeMe from "react-sizeme";
const css = require('./dashboard.pcss');

export const mapDispatchToPmapStaterops = (dispatch) => {
    return bindActionCreators({SET_APP_BAR_MENU: SET_APP_BAR_MENU}, dispatch);
};


@connect((state) => ({app: state.app}), mapDispatchToPmapStaterops)
class DashboardComponent extends React.Component<any, any> {
    context: any;
    static contextTypes = {router: React.PropTypes.object};

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let menuIcon =
            <IconButton onClick={()=>{
                this.context.router.go("/");
                this.context.router.goForward("/");
                this.context.router.replace("/");
                console.log("hello")}}>
                <MoreVertIcon />
            </IconButton>;
        this.props.SET_APP_BAR_MENU(menuIcon);


    }


    render() {
        const {height} = this.props.size;
        console.log(height);
        console.log(this.props.size)
        return <div>
            <Route component={DashboardTAB}/>

            <Route path="/dashboard/graphs"
                   size={this.props.size}
                   component={Graphs}/>
            <Route path="/dashboard/workers"
                   size={this.props.size}
                   component={List}/>
            <Route path="/dashboard/insert"
                   size={this.props.size}
                   component={InsertComponent}/>
        </div>


    }
}


export default withStyles(css)(SizeMe({monitorHeight: true})(BelowAppBar(DashboardComponent)));

