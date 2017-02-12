import {UniqueN} from "../../shared/unique";
import * as React from "react";

const BarChart = require("react-chartjs").Bar;


export const SalaryGrossChart = ({sheet, width}) => {
    let companyCollumn = sheet.value.map(worker => worker.company);
    let companyUnique = UniqueN(companyCollumn);
    let arrayOfCompanysGrossSum = companyUnique[0].map((company, index) => {
        let allWorkerFromCompanyN = sheet.value.filter(worker => {
            if (worker.company == company) {
                return worker;
            }
        });
        let total = allWorkerFromCompanyN.map(worker => {
            return worker.salary
        }).reduce((a, b) => a + b, 0);
        return total
    });

    let data = {
        labels: companyUnique[0],
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1,

                data: arrayOfCompanysGrossSum,
            }
        ]
    };
    let opt = {
        responsive: true,
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
    };
    return <BarChart data={data}
                     options={opt}
                     width={width}
                     height="250"/>
};
