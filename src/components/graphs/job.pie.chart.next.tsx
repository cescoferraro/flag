import {UniqueN} from "../../shared/unique";
import * as React from "react";
const DoughnutChart = require("react-chartjs").Doughnut;


export class JobPieChart extends React.Component<any, any> {
    refs: {
        chart: any;
    };
    chartOptions = {
        segmentShowStroke: true,
        animateRotate: true,
        responsive: true,
        height: 260,
    };

    componentDidMount() {
        let legend = this.refs.chart.getChart().generateLegend();

        this.setState({
            legend: legend
        });
    }


    render() {
        let result = UniqueN(this.props.sheet.value.map(worker => worker.job));
        let pieData = result[0].map((value, index) => {
            return {
                value: result[1][index],
                color: '#' + Math.floor(Math.random() * 16777215).toString(16),
                highlight: '#' + Math.floor(Math.random() * 16777215).toString(16),
                label: result[0][index]
            }
        });

        let legend = this.state && this.state.legend || '';
        return <div>
            <h2>Job Distribution</h2>

            <div style={{ maxHeight:"400px",
                width:this.props.width,display:"flex"}}>
                <DoughnutChart
                    ref="chart" data={pieData}
                    options={this.chartOptions}
                />
            </div>
        </div>;
    }
}
;
