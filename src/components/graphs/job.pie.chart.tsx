import {UniqueN} from "../../shared/unique";
import * as React from "react";

import {PieChart} from "react-d3";
const BarChart = require("react-chartjs").Bar;


export const JobPieChart = ({sheet, width}) => {
    let typesJOb = sheet.value.map(worker => worker.job);
    let resultjob = UniqueN(typesJOb);
    let pieDatajob = resultjob[0].map((value, index) => {
        return {label: resultjob[0][index], value: resultjob[1][index]}
    });
    return  <PieChart
        data={pieDatajob}
        width={width / 2}
        height={200}
        radius={60}
        innerRadius={15}
        sectorBorderColor="purple"
        title="Job Pie Chart"
    />
};
