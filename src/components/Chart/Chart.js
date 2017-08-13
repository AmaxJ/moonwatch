import React from 'react';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line } from 'd3-shape';
import { extent } from 'd3-array';
import each from 'lodash/each';
import PropTypes from 'prop-types';
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
        xTicks: PropTypes.object,
        yTicks: PropTypes.object
    }

    static defaultProps = {
        canvasNotSupportedText: 'Canvas not supported in this browser',
        margin: {
            top: 20,
            bottom: 20,
            right: 30,
            left: 30
        },
        xTicks: {
            number: 6,
            size: 6
        },
        yTicks: {
            number: 10,
            size: 6
        },
        interval: 1,
        lastPrice: {
            close: null,
            time: null
        }
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
        this.ctx.strokeStyle = 'black';
        this.ctx.save();
        this.setXScale(getXDomain(priceData));
        this.setYScale(getYDomain(priceData));
        this.setLine();
        this.ctx.beginPath();
        this.renderYAxis();
        this.renderXAxis();
        this.ctx.beginPath();
        this.renderLine(priceData);
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
        this.renderYAxis();
        this.renderXAxis();
        this.ctx.beginPath();
        this.renderLine(newPriceData);
    }

    setLineColor(priceData) {
        if (priceData[0].close > priceData[priceData.length - 1].close) {
            this.ctx.strokeStyle = 'red';
        } else {
            this.ctx.strokeStyle = 'green';
        }
    }

    setXScale(domain) {
        this.xScale = scaleTime()
            .domain(domain)
            .range([0, this.width]);
    }

    setYScale(domain) {
        this.yScale = scaleLinear()
            .domain(domain)
            .range([this.height, 0]);
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

    renderYAxis() {
        const { yTicks } = this.props;
        const {
            ctx,
            yScale,
            height
        } = this;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';

        const ticks = yScale.ticks(yTicks.number);

        ctx.moveTo(0.5, 0);
        ctx.lineTo(0.5, height);

        each(ticks, (data) => {
            ctx.moveTo(0, yScale(data));
            ctx.lineTo(-yTicks.size, yScale(data));
            ctx.fillText(`${data}`, -yTicks.size, yScale(data));
        });

        ctx.stroke();
        ctx.restore();
    }

    renderXAxis() {
        const { xTicks } = this.props;
        const {
            ctx,
            xScale,
            height
        } = this;

        const ticks = xScale.ticks(xTicks.number);

        ctx.strokeStyle = 'black';
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
                  width={this.props.width}
                  style={{ border: '1px solid black' }}>
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
