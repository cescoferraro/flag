import {Tabs, Tab} from "material-ui/Tabs";
import * as React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";

let css = require("./tabs.pcss");

export class DashboardTAB extends React.Component<any, any> {

    context: any;
    static contextTypes = {router: React.PropTypes.object};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Tabs
                id="TAB"
                style={{position:"fixed",zIndex:"22",bottom:"0",width:"100vw"}}>
                <Tab label="Workers"
                     onClick={() => { this.context.router.push("/dashboard/workers") }}
                     data-route="/dashboard/workers">
                </Tab>
                <Tab label="Graphs"
                     onClick={() => { this.context.router.push("/dashboard/graphs") }}
                     data-route="/dashboard/graphs">
                </Tab>

                <Tab label="Insert"
                     onClick={() => { this.context.router.push("/dashboard/insert") }}
                     data-route="/dashboard/insert">
                </Tab>
            </Tabs>



        );
    }

}


export default withStyles(css)(DashboardTAB)
