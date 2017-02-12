import {UniqueN} from "../../shared/unique";
import * as React from "react";
const DoughnutChart = require("react-chartjs").Doughnut;


export class RacePieChart extends React.Component<any, any> {
    refs: {
        chart: any;
    };
    chartOptions = {
        segmentShowStroke: true,
        animateRotate: true,
        animateScale: true,
        responsive: true,
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

        let legend = this.state && this.state.legend || '';
        return <div style={{display:"flex"}}>
            <DoughnutChart
                ref="chart" data={pieData}
                options={this.chartOptions}
                width={this.props.width/2*2/3}
                height={300}
                className="cv-chart"/>
            <div dangerouslySetInnerHTML={{ __html: legend }}/>
        </div>;
    }
}
;
