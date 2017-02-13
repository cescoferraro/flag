import * as React from "react";
import {Node} from "./node";
const rd4 = require('react-d3-library');
const RD3Component = rd4.Component;
const BarChart = rd4.BarChart;
export class RD4Chart extends React.Component<any,any> {

    constructor(props) {
        super(props);
        this.state = {d3: ''}
    }

    componentDidMount() {
        this.setState({d3: Node});
    }

    render() {
        return (
            <div>
                <BarChart data={this.state.d3} />
            </div>
        )
    }
}
