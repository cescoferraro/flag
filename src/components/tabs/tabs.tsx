import {Tabs, Tab} from "material-ui/Tabs";
import * as React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import {connect} from "react-redux";
let css = require("./tabs.pcss");

@withStyles(css)
@connect((state) => ({app: state.app}), null)
export class DashboardTAB extends React.Component<any, any> {
    render() {
        return (
            <Tabs
                value={this.props.app.selectedTab}
                id="TAB"
                style={{
                    backgroundColor:"#43A047",
                    position:"fixed",
                    zIndex:"22",
                    bottom:"0",
                    width:"100vw"}}>
                <Tab label="Workers"
                     value={1}
                     style={{backgroundColor:"#43A047"}}
                     onClick={() => { this.props.push("/dashboard/workers") }}
                     data-route="/dashboard/workers">
                </Tab>
                <Tab label="Graphs"
                     value={2}
                     style={{backgroundColor:"#43A047"}}
                     onClick={() => { this.props.push("/dashboard/graphs") }}
                     data-route="/dashboard/graphs">
                </Tab>

                <Tab label="Insert"
                     value={3}
                     style={{backgroundColor:"#43A047"}}
                     onClick={() => { this.props.push("/dashboard/insert") }}
                     data-route="/dashboard/insert">
                </Tab>
            </Tabs>
        );
    }

}

