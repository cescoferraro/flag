import * as React from "react";
import {Treemap, PieChart} from "rd3";
import {Button} from "rebass";
import {PromiseState, connect as REFETCH} from "react-refetch";
import {Grid, Cell} from "radium-grid";
import {Spinner} from "../spinner/index";
import Utils from "../../shared/utils";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import {SalaryGrossChart} from "./salary.bar.chart";
import {JobCountTreemapChart} from "./job.count.treemap.chart";
import {WorkerCountTreemapChart} from "./worker.count.treemap.chart";
import {WorkerSalaryTreemapChart} from "./worker.salary.treemap.chart";
import {JobPieChart} from "./job.pie.chart.next";
import {RacePieChart} from "./race.pie.chart";
import {connect} from "react-redux";
import {BubbleChart} from "./worker.salary.bubble.chart";
import SizeMe from "react-sizeme";
import {AppActions} from "../../redux/actions";
const Infinite = require('react-infinite');
const css = require('./graph.pcss');


@connect((state) => ({app: state.app}), AppActions)
@REFETCH(props => ({
    sheet: Utils.API_URL("/sheet")
}))
@withStyles(css)
@SizeMe({monitorHeight: true})
export class Graphs extends React.Component<any, any> {

    componentDidMount() {
        this.props.SET_ACTIVE_TAB(2);
    }

    render() {

        const sheet = this.props.sheet;
        const {height, width} = this.props.size;
        const scroll = height - 48;
        if (sheet.pending) {
            return <Spinner />
        } else if (sheet.rejected) {
            return <h2>error</h2>
        } else if (sheet.fulfilled) {
            return (
                <div style={{height:"calc( 100vh - 64px)"}}>
                    <Infinite containerHeight={scroll}
                              elementHeight={[scroll]}>
                        <div>
                            <BubbleChart width={width} sheet={sheet}/>
                            {/*<RD4Chart width={width} sheet={sheet}/>*/}
                            <JobCountTreemapChart width={width} sheet={sheet}/>
                            <h2>PAYROLL BY COMPANY</h2>
                            <SalaryGrossChart width={width} sheet={sheet}/>
                            <JobPieChart width={width} sheet={sheet}/>
                            <WorkerCountTreemapChart width={width} sheet={sheet}/>
                            <WorkerSalaryTreemapChart width={width} sheet={sheet}/>
                            <RacePieChart width={width} sheet={sheet}/>
                            <h2>END</h2>
                        </div>
                    </Infinite>
                </div>
            );

        }

    }
}
