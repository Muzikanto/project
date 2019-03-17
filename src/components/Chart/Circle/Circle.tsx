import {Doughnut} from 'react-chartjs-2';
import * as React from 'react';
import {getRandomColor} from '../utils';

export interface IDoughnutChartProps {
    labels: string[];
    values: number[];
}


class CircleChart extends React.Component<IDoughnutChartProps> {

    public optionsChart = {
        legend: {
            display: false
        }
    };

    public getChartData() {
        const {labels, values} = this.props;
        const datasetChart: any = {
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: '#fedd61'
        };

        const chart: any = {
            labels: [],
            datasets: [datasetChart]
        };

        for (let i = 0; i < labels.length; i++) {
            datasetChart.data.push(values[i]);
            datasetChart.backgroundColor.push(getRandomColor());
            chart.labels.push(labels[i])
        }

        return chart;
    }

    public render() {
        return (
            <Doughnut options={this.optionsChart} data={this.getChartData()}/>
        );
    }
}

export default CircleChart;
