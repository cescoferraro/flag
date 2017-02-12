import {UniqueN} from "../../shared/unique";
import * as React from "react";
import {Treemap} from "react-d3";


export const WorkerCountTreemapChart = ({sheet, width}) => {
    let typesJOb = sheet.value.map(worker => worker.company);
    let resultjob = UniqueN(typesJOb);
    let enterpriseDatajob = resultjob[0].map((value, index) => {
        return {label: resultjob[0][index], value: resultjob[1][index]}
    });
    return  <Treemap
        data={enterpriseDatajob}
        width={width}
        height={200}
        sectorBorderColor="purple"

        title="Worker Count Treemap Chart"
    />
};
