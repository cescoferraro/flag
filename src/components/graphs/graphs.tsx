import * as React from "react";
import {Treemap, PieChart} from "rd3";
import {Button} from "rebass";
import {PromiseState, connect as REFETCH} from "react-refetch";
import SizeMe from "react-sizeme";
import {Grid, Cell} from "radium-grid";
import {SalaryGrossChart} from "./salary.bar.chart";
import {ErrorComponent} from "../error/error";
import {Spinner} from "../spinner/index";
import Utils from "../../shared/utils";
import {JobPieChart} from "./job.pie.chart";
import {JobCountTreemapChart} from "./job.count.treemap.chart";
import {WorkerCountTreemapChart} from "./worker.count.treemap.chart";
import {WorkerSalaryTreemapChart} from "./worker.salary.treemap.chart";
import {RacePieChart} from "./race.pie.chart";

let GraphComponent = ({size, sheet}) => {
    const {width} = size;
    if (sheet.pending) {
        return <Spinner />
    } else if (sheet.rejected) {
        return <ErrorComponent/>
    } else if (sheet.fulfilled) {
        return <div>

            <SalaryGrossChart width={width} sheet={sheet}/>

            <div style={{display:"flex"}}>

                <RacePieChart width={width/2} sheet={sheet}/>
                {/*<Next width={width} sheet={sheet}/>*/}

            </div>
            <JobPieChart width={width} sheet={sheet}/>

            <JobCountTreemapChart width={width} sheet={sheet}/>
            <WorkerCountTreemapChart width={width} sheet={sheet}/>
            <WorkerSalaryTreemapChart width={width} sheet={sheet}/>
        </div>
    }

};


export const Graphs = REFETCH(props => ({
    sheet: Utils.API_URL("/sheet")
}))(SizeMe()(GraphComponent));

