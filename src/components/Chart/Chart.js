/* eslint-disable react/self-closing-comp, no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS } from 'chart.js';
import { Colors } from '../../constants';
import './Chart.scss';

export default class Chart extends React.Component {

    static propTypes = {
        canvasNotSupportedText: PropTypes.string,
        height: PropTypes.number,
        interval: PropTypes.number,
        lastPrice: PropTypes.object,
        priceHistory: PropTypes.array,
        width: PropTypes.number,
        chartOptions: PropTypes.object
    }

    static defaultProps = {
        interval: 60,
        chartOptions: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    },
                    time: {
                        unit: 'minute'
                    },
                    ticks: {
                        maxTicksLimit: 10
                    }
                }]
            },
            elements: {
                point: {
                    radius: 0
                }
            }
        }
    }

    constructor(props) {
        super(props);
        this.priceData = props.priceHistory.map((priceObj) => priceObj.close);
        this.timestamps = props.priceHistory.map((priceObj) => {
            return {
                formattedTime: formatTime(priceObj.time),
                time: priceObj.time
            };
        });
    }

    componentDidMount() {
        this.ctx = this.canvas.getContext('2d');
        this.chart = new ChartJS(this.ctx, {
            type: 'line',
            data: {
                labels: this.timestamps.map((timestamp) => timestamp.formattedTime),
                datasets: [{
                    label: 'Price', // hidden
                    data: this.priceData,
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderColor: this.getLineColor(),
                    borderWidth: 0.8,
                    lineTension: 0
                }]
            },
            options: this.props.chartOptions
        });
    }

    componentWillReceiveProps(nextProps) {
        const { lastPrice: { close, time }, interval } = nextProps;
        const secondsSinceRender = time - this.timestamps[this.timestamps.length - 1].time;
        if (secondsSinceRender < interval) {
            return;
        }
        this.priceData = this.priceData.concat([close]).slice(1);
        this.timestamps = this.timestamps.concat(
            [{ time, formattedTime: formatTime(time) }]
        ).slice(1);

        this.chart.data.labels = this.timestamps.map((timeObj) => timeObj.formattedTime);

        this.chart.data.datasets.forEach((dataset) => {
            dataset.data = this.priceData;
            dataset.borderColor = this.getLineColor();
        });

        this.chart.update({
            duration: 0
        });
    }

    getLineColor() {
        if (this.priceData[0] > this.priceData[this.priceData.length - 1]) {
            return Colors.CHART_RED;
        }
        return Colors.CHART_GREEN;
    }

    canvasRefHandler = (el) => {
        this.canvas = el;
    }

    render() {
        return (
            <div className="Chart__container">
                <canvas
                  className="Chart__canvas"
                  ref={this.canvasRefHandler}
                  height={this.props.height}
                  width={this.props.width} >
                    {this.props.canvasNotSupportedText}
                </canvas>
            </div>
        );
    }
}

function formatTime(UTCTimestamp) {
    const time = new Date(UTCTimestamp * 1000);
    const hour = time.getHours();
    const minute = time.getMinutes();
    const standardHour = hour > 12 ? hour - 12 : hour;
    const formattedHour = standardHour === 0 ? 12 : standardHour;
    const formattedMinute = minute === 0 ? '00' : minute;
    if (formattedMinute < 10 && formattedMinute > 0) {
        return `${formattedHour}:0${formattedMinute}`;
    }
    return `${formattedHour}:${formattedMinute}`;
}
