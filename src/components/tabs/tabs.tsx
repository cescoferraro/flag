import { Tabs, Tab } from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import * as React from "react";
import Utils from "../../shared/utils";

import { Route, IndexRoute, Router, Switch, Link } from "react-router-dom";
import { List } from "../workers/worker.list";
const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};



function handleActive(tab) {
    alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
}

let style = { height: "calc( 100vh - 64px)" };
export class DashboardTAB extends React.Component<any, any> {

    context: any;
    static contextTypes = { router: React.PropTypes.object };
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Tabs>
                <Tab label="Workers"
                    onClick={() => { this.context.router.push("/dashboard/workers") }}
                    data-route="/dashboard/workers">
                </Tab>
                <Tab label="Graphs"
                    onClick={() => { this.context.router.push("/dashboard/graphs") }}
                    data-route="/dashboard/graphs" >
                </Tab>
            </Tabs>
        );
    }

}




export default DashboardTAB