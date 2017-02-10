import * as React from "react";
import { Treemap } from 'react-d3';
import { PieChart } from 'react-d3';
import { Button } from 'rebass'
import { connect, PromiseState } from "react-refetch";
import Utils from "../../shared/utils";
import SizeMe from 'react-sizeme';
import * as _ from "lodash";
import { Grid, Cell } from 'radium-grid';

var PieChart = require("react-chartjs").Pie;



function foo(arr) {
    var a = [], b = [], prev;

    arr.sort();
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== prev) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length - 1]++;
        }
        prev = arr[i];
    }

    return [a, b];
}


let GraphComponent = ({size, sheet}) => {

    const { width, height } = size;


    if (sheet.pending) {
        return <h2>loaidng</h2>
    } else if (sheet.rejected) {
        return <h2>error</h2>
    } else if (sheet.fulfilled) {

        let types = sheet.value.map(worker => worker.Race);
        var result = foo(types);
        var pieData = result[0].map((value, index) => {
            return { label: result[0][index], value: result[1][index] }
        });


        let typesJOb = sheet.value.map(worker => worker.Job);
        var resultjob = foo(typesJOb);
        var pieDatajob = resultjob[0].map((value, index) => {
            return { label: resultjob[0][index], value: resultjob[1][index] }
        });





        let company = sheet.value.map(worker => worker.Company);
        var companyjob = foo(company);
        var enterpriseDatajob = companyjob[0].map((value, index) => {
            return { label: companyjob[0][index], value: companyjob[1][index] }
        });


        let SalarybyCOmpany = companyjob[0].map((company, index) => {
            let test = sheet.value.filter(worker => {
                if (worker.Company == company) {
                    return worker;
                }
            })
            let wowo = test.map(worker => {
                return worker.Salary
            }).reduce((a, b) => a + b, 0)


            console.log(wowo);

            console.log(company);

            console.log(test.length);
            return { label: company, value: wowo }
        })





        let birthdateJOb = sheet.value.map(worker => {
            let age = new Date(worker.Birthdate)
            return calculateAge(age.getUTCMonth() + 1, age.getUTCDate(), age.getUTCFullYear())
        });


        console.log(pieData)

        return <div>


            <div style={{ display: "flex" }}>


                <PieChart
                    data={pieData}
                    width={width / 2}
                    height={200}
                    radius={60}
                    innerRadius={15}
                    sectorBorderColor="purple"
                    title="Race Pie Chart"
                />
                <PieChart
                    data={pieDatajob}
                    width={width / 2}
                    height={200}
                    radius={60}
                    innerRadius={15}
                    sectorBorderColor="purple"
                    title="Job Pie Chart"
                />
            </div>


            <Treemap
                data={pieDatajob}
                width={width}
                height={200}
                sectorBorderColor="purple"

                title=" Employees Job Count Treemap Chart"
            />

            <Treemap
                data={enterpriseDatajob}
                width={width}
                height={200}
                sectorBorderColor="purple"

                title="Employees Count Treemap Chart"
            />


            <Treemap
                data={SalarybyCOmpany}
                width={width}
                height={200}
                sectorBorderColor="purple"

                title="Employees Salary by Company Treemap Chart"
            />




        </div>
    }

}

function calculateAge(birthMonth, birthDay, birthYear) {
    let todayDate = new Date();
    let todayYear = todayDate.getFullYear();
    let todayMonth = todayDate.getMonth();
    let todayDay = todayDate.getDate();
    let age = todayYear - birthYear;

    if (todayMonth < birthMonth - 1) {
        age--;
    }

    if (birthMonth - 1 == todayMonth && todayDay < birthDay) {
        age--;
    }
    return age;
}

export const Graphs = connect(props => ({
    sheet: Utils.API_URL("/sheet")
}))(SizeMe({ monitorHeight: true })(GraphComponent));

