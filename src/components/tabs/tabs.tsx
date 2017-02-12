import {Tabs, Tab} from "material-ui/Tabs";
import * as React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import {connect} from "react-redux";
let css = require("./tabs.pcss");


@connect((state) => ({app: state.app}), null)
class DashboardTABComponent extends React.Component<any, any> {

    context: any;
    static contextTypes = {router: React.PropTypes.object};

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.app.selectedTab);
        return (
            <Tabs
                value={this.props.app.selectedTab}
                id="TAB"
                style={{position:"fixed",zIndex:"22",bottom:"0",width:"100vw"}}>
                <Tab label="Workers"
                     value={1}
                     onClick={() => { this.context.router.push("/dashboard/workers") }}
                     data-route="/dashboard/workers">
                </Tab>
                <Tab label="Graphs"
                     value={2}
                     onClick={() => { this.context.router.push("/dashboard/graphs") }}
                     data-route="/dashboard/graphs">
                </Tab>

                <Tab label="Insert"
                     value={3}
                     onClick={() => { this.context.router.push("/dashboard/insert") }}
                     data-route="/dashboard/insert">
                </Tab>
            </Tabs>



        );
    }

}


export const DashboardTAB = withStyles(css)(DashboardTABComponent);
