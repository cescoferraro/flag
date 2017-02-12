import {UniqueN} from "../../shared/unique";
import * as React from "react";
import {Treemap} from "react-d3";


export const JobCountTreemapChart = ({sheet, width}) => {
    let typesJOb = sheet.value.map(worker => worker.job);
    let resultjob = UniqueN(typesJOb);
    let pieDatajob = resultjob[0].map((value, index) => {
        return {label: resultjob[0][index], value: resultjob[1][index]}
    });
    return  <Treemap
        data={pieDatajob}
        width={width}
        height={200}
        sectorBorderColor="purple"

        title=" Employees Job Count Treemap Chart"
    />
};
