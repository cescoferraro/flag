import {UniqueN} from "../../shared/unique";
import * as React from "react";
import {Treemap} from "rd3";


export const WorkerSalaryTreemapChart = ({sheet, width}) => {
    let company = sheet.value.map(worker => worker.company);
    let companyjob = UniqueN(company);
    let SalarybyCOmpany = companyjob[0].map((company) => {
        let test = sheet.value.filter(worker => {
            if (worker.company == company) {
                return worker;
            }
        });
        let wowo = test.map(worker => {
            return worker.salary
        }).reduce((a, b) => a + b, 0);


        return {label: company, value: wowo};
    });
    return  <Treemap
        data={SalarybyCOmpany}
        width={width}
        height={200}
        sectorBorderColor="purple"

        title="Employees Salary by Company Treemap Chart"
    />
};
