/* eslint-disable react/self-closing-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS } from 'chart.js';
import { Colors } from '../../constants';
import './Chart.scss';

export default class Chart extends React.Component {

    static propTypes = {
        canvasNotSupportedText: PropTypes.string,
        height: PropTypes.number,
        width: PropTypes.number,
        priceHistory: PropTypes.array
    }

    constructor(props) {
        super(props);
        this.state = {
            priceData: props.priceHistory
        };
    }

    componentDidMount() {
        // const { margin } = this.props;
        const margin = {
            top: 20,
            bottom: 20,
            right: 30,
            left: 46
        };
        // const { priceData } = this.state;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.translate(margin.left, margin.top);
        this.ctx.strokeStyle = Colors.WHITE;
        this.ctx.fillStyle = Colors.WHITE;
        this.ctx.lineWidth = 1;
        this.chart = new ChartJS(this.ctx, {
            type: 'line',
            data: {
                labels: this.state.priceData.map((priceObj) => {
                    const time = new Date(priceObj.time * 1000);
                    // TODO if the time is 12:30 it shows as 12:3
                    return `${time.getHours()}:${time.getMinutes()}`;
                }),
                datasets: [{
                    label: 'Price', // hidden
                    data: this.state.priceData.map((priceObj) => priceObj.close),
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderColor: Colors.WHITE,
                    borderWidth: 0.8,
                    lineTension: 0
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        time: {
                            unit: 'minute'
                        }
                    }]
                },
                elements: {
                    point: {
                        radius: 0
                    }
                }
            }
        });

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
