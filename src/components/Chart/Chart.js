import React from 'react';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line } from 'd3-shape';
import { extent } from 'd3-array';
import each from 'lodash/each';
import PropTypes from 'prop-types';
import { Colors } from '../../constants';
import './Chart.css';
/* eslint-disable react/self-closing-comp */
export default class Chart extends React.Component {

    static propTypes = {
        canvasNotSupportedText: PropTypes.string,
        height: PropTypes.number,
        width: PropTypes.number,
        lastPrice: PropTypes.object,
        interval: PropTypes.number,
        margin: PropTypes.object,
        priceHistory: PropTypes.array,
        xAxis: PropTypes.object,
        xTicks: PropTypes.object,
        yAxis: PropTypes.object,
        yTicks: PropTypes.object

    }

    static defaultProps = {
        canvasNotSupportedText: 'Canvas not supported in this browser',
        margin: {
            top: 20,
            bottom: 20,
            right: 30,
            left: 46
        },
        xTicks: {
            number: 6,
            size: 4
        },
        yTicks: {
            number: 10,
            size: 3
        },
        interval: 1,
        lastPrice: {
            close: null,
            time: null
        },
        yAxis: { render: true },
        xAxis: { render: true }
    }

    constructor(props) {
        super(props);
        this.state = {
            priceData: props.priceHistory
        };
    }

    componentDidMount() {
        const { margin } = this.props;
        const { priceData } = this.state;

        this.ctx = this.canvas.getContext('2d');
        this.width = this.props.width - (margin.left + margin.right);
        this.height = this.props.height - (margin.top + margin.bottom);

        this.ctx.translate(margin.left, margin.top);
        this.ctx.strokeStyle = Colors.WHITE;
        this.ctx.fillStyle = Colors.WHITE;
        this.ctx.lineWidth = 1;

        this.setXScale(getXDomain(priceData));
        this.setYScale(getYDomain(priceData));

        this.ctx.beginPath();
        this.renderLine(priceData);
        this.ctx.beginPath();
        this.renderYAxis();
        this.renderXAxis();
    }

    componentWillReceiveProps(nextProps) {
        const { height, width, margin } = this.props;
        const { priceData } = this.state;
        const { lastPrice, interval } = nextProps;
        const secondsSinceRender = lastPrice.time - priceData[priceData.length - 1].time;
        if (secondsSinceRender < interval * 60) {
            return;
        }

        const newPriceData = priceData.concat([lastPrice]).slice(1);
        // update state and scales
        this.setState({ priceData: newPriceData });
        this.setXScale(getXDomain(newPriceData));
        this.setYScale(getYDomain(newPriceData));

        // re-draw
        this.ctx.translate(-margin.left, -margin.top);
        this.ctx.clearRect(0, 0, width, height);
        this.ctx.translate(margin.left, margin.top);

        this.ctx.beginPath();
        this.renderLine(newPriceData);
        this.ctx.beginPath();
        this.renderYAxis();
        this.renderXAxis();
    }

    setLineColor(priceData) {
        if (priceData[0].close > priceData[priceData.length - 1].close) {
            this.ctx.strokeStyle = Colors.CHART_RED;
        } else {
            this.ctx.strokeStyle = Colors.CHART_GREEN;
        }
    }

    setXScale(domain) {
        this.xScale = scaleTime()
            .domain(domain)
            .range([0.5, this.width - 0.5]);
    }

    setYScale(domain) {
        this.yScale = scaleLinear()
            .domain(domain)
            .range([this.height - 0.5, 0.5]);
    }

    setLine() {
        this.line = line()
            .x((data) => this.xScale(new Date(data.time * 1000)))
            .y((data) => this.yScale(data.close))
            .context(this.ctx);
    }

    canvasRefHandler = (el) => {
        this.canvas = el;
    }

    renderLine(priceData, width = 1) {
        this.setLine();
        this.line(priceData);
        this.setLineColor(priceData);
        this.ctx.lineWidth = width;
        this.ctx.stroke();
        this.ctx.restore();
    }

    renderYAxis(axisBox = true) {
        if (!this.props.yAxis.render) {
            return;
        }
        const { yTicks } = this.props;
        const {
            ctx,
            yScale,
            height,
            width
        } = this;

        ctx.strokeStyle = Colors.WHITE;
        ctx.fillStyle = Colors.WHITE;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';

        const ticks = yScale.ticks(yTicks.number);

        ctx.moveTo(0, 0.5);
        ctx.lineTo(5, 0.5);
        ctx.moveTo(0.5, 0.5);
        ctx.lineTo(0.5, height + 0.5);
        ctx.lineTo(5, height + 0.5);

        if (axisBox) {
            ctx.moveTo(5, 0.5);
            ctx.lineTo(width, 0.5);
            ctx.lineTo(width + 0.5, height);
            ctx.lineTo(5, height + 0.5);
        }

        each(ticks, (data) => {
            ctx.moveTo(0, yScale(data));
            ctx.lineTo(-yTicks.size, yScale(data));
            ctx.font = '10px sans-serif';
            const number = data % 1 === 0 ? data : data.toFixed(2);
            ctx.fillText(`${number}`, -8, yScale(data) - 6.5);
        });

        ctx.stroke();
        ctx.restore();
    }

    renderXAxis() {
        if (!this.props.xAxis.render) {
            return;
        }
        const { xTicks } = this.props;
        const {
            ctx,
            xScale,
            height
        } = this;

        const ticks = xScale.ticks(xTicks.number);

        ctx.strokeStyle = Colors.WHITE;
        ctx.fillStyle = Colors.WHITE;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        each(ticks, (data) => {
            const hour = data.getHours();
            const minute = data.getMinutes();
            const standardHour = hour > 12 ? hour - 12 : hour;
            const formattedHour = standardHour === 0 ? 12 : standardHour;
            const formattedMinute = minute === 0 ? '00' : minute;
            const formattedTime = `${formattedHour}:${formattedMinute}`;

            ctx.moveTo(xScale(data), height);
            ctx.lineTo(xScale(data), height + xTicks.size);

            ctx.fillText(formattedTime, xScale(data), height + xTicks.size);
        });

        ctx.stroke();
        ctx.restore();
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

function getXDomain(priceData) {
    return extent(priceData, (d) => d.time * 1000);
}

function getYDomain(priceData) {
    return extent(priceData, (d) => d.close);
}
