import {UniqueN} from "../../shared/unique";
import {Doughnut as DoughnutChart} from "react-chartjs";
import * as React from "react";


export class RacePieChart extends React.Component<any, any> {
    refs: {
        chart: any;
    };
    chartOptions = {
        responsive: true
    };

    componentDidMount() {
        let legend = this.refs.chart.getChart().generateLegend();
        this.setState({
            legend: legend
        });
    }


    render() {
        let result = UniqueN(this.props.sheet.value.map(worker => worker.race));
        let pieData = result[0].map((value, index) => {
            return {
                value: result[1][index],
                color: '#' + Math.floor(Math.random() * 16777215).toString(16),
                highlight: '#' + Math.floor(Math.random() * 16777215).toString(16),
                label: result[0][index]
            }
        });
        return <div>
            <h2>Race Distribution</h2>

            <div style={{ maxHeight:"400px",
                width:this.props.width,display:"flex"}}>
                <DoughnutChart
                    ref="chart" data={pieData}
                    options={this.chartOptions}
                    className="cv-chart"/>
            </div>
        </div>

    }
}
