import {UniqueN} from "../../shared/unique";
import * as React from "react";
import {Treemap} from "rd3";
import * as D3ACT from "d3act";

export const BubbleChart = ({sheet, width}) => {
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


        return {name: company, value: wowo};
    });
    return  <D3ACT
        type={"bubble"}
        diameter={width}
        showTooltips={true}
        data={getData(SalarybyCOmpany)}/>






};

const getData = (array) => ({
    children: array
});
