import * as React from "react";
import {Treemap, PieChart} from "rd3";
import {Button} from "rebass";
import {PromiseState, connect as REFETCH} from "react-refetch";
import {Grid, Cell} from "radium-grid";
import {ErrorComponent} from "../error/error";
import {Spinner} from "../spinner/index";
import Utils from "../../shared/utils";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import {SalaryGrossChart} from "./salary.bar.chart";
import {JobCountTreemapChart} from "./job.count.treemap.chart";
import {WorkerCountTreemapChart} from "./worker.count.treemap.chart";
import {WorkerSalaryTreemapChart} from "./worker.salary.treemap.chart";
import {JobPieChart} from "./job.pie.chart.next";
import {RacePieChart} from "./race.pie.chart";
import {SET_ACTIVE_TAB} from "../../actions/app";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
const Infinite = require('react-infinite');
const css = require('./graph.pcss');


export const mapDispatchToPmapStaterops = (dispatch) => {
    return bindActionCreators({SET_ACTIVE_TAB: SET_ACTIVE_TAB}, dispatch);
};

//
// let GraphComponent = ({size, sheet, app, SET_ACTIVE_TAB}) => {
@connect((state) => ({app: state.app}), mapDispatchToPmapStaterops)
class GraphComponent extends React.Component<any, any> {

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
            return <ErrorComponent/>
        } else if (sheet.fulfilled) {
            console.log(this.props.app);
            return (
                <Infinite containerHeight={scroll}
                          elementHeight={[scroll]}>
                    <div>
                        <div>
                            <h2>HERE WE HAVE SOME FUN!</h2>

                        </div>


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
            );

        }

    }
}


export const Graphs = REFETCH(props => ({
    sheet: Utils.API_URL("/sheet")
}))(withStyles(css)(GraphComponent));


{/*<div className={css.container}>*/
}
{/*<SalaryGrossChart width={width*9/10} sheet={sheet}/>*/
}
{/*<JobCountTreemapChart width={width*9/10} sheet={sheet}/>*/
}
{/*<WorkerCountTreemapChart width={width*9/10} sheet={sheet}/>*/
}
{/*<WorkerSalaryTreemapChart width={width*9/10} sheet={sheet}/>*/
}
{/*</div> */
}
