import * as React from 'react';
import {Line} from 'react-chartjs-2';

export interface ILineChartProps {
    labels: string[];
    values: number[];
}

class LineChart extends React.Component<ILineChartProps> {
    public options = {
        title: {
            display: false
        },
        legend: {
            display: false
        }
    };

    constructor(props: ILineChartProps) {
        super(props);
    }

    public lineChartData = (labels: string[], data: number[]) => {
        return {
            labels,
            datasets: [
                {
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data
                }
            ]
        }
    };


    public render() {
        return (
            <Line data={this.lineChartData(this.props.labels, this.props.values)} options={this.options}/>
        );
    }
}

export default LineChart;