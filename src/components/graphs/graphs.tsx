import * as React from "react";
import {Treemap, PieChart} from "rd3";
import {Button} from "rebass";
import {PromiseState, connect as REFETCH} from "react-refetch";
import {Grid, Cell} from "radium-grid";
import {ErrorComponent} from "../error/error";
import {Spinner} from "../spinner/index";
import Utils from "../../shared/utils";
import withStyles from "isomorphic-style-loader/lib/withStyles";
const Infinite = require('react-infinite');
const css = require('./graph.pcss');


let GraphComponent = ({size, sheet}) => {
    const {height, width} = size;
    const scroll = height - 48;
    if (sheet.pending) {
        return <Spinner />
    } else if (sheet.rejected) {
        return <ErrorComponent/>
    } else if (sheet.fulfilled) {
        console.log("inside");
        console.log(height);
        return (
            <Infinite containerHeight={scroll}
                      elementHeight={[scroll]}>
                <div >
                    <h2>START</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfns100dkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>kjfnsdkjfnds</h2>
                    <h2>END</h2>
                </div>
            </Infinite>
        );

    }

};


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
