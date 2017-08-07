import React from 'react';
import * as d3 from 'd3';
import each from 'lodash/each';
import PropTypes from 'prop-types';
import './Chart.css';
/* eslint-disable react/self-closing-comp */
class Chart extends React.Component {

    static propTypes = {
        priceHistory: PropTypes.array,
        height: PropTypes.number,
        width: PropTypes.number,
        canvasNotSupportedText: PropTypes.string,
        margin: PropTypes.object,
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
        }
    }

    componentDidMount() {
        this.ctx = this.canvas.getContext('2d');
        const { margin, priceHistory } = this.props;
        this.width = this.props.width - (margin.left + margin.right);
        this.height = this.props.height - (margin.top + margin.bottom);

        this.ctx.translate(margin.left, margin.top);

        this.xScale = d3.scaleTime()
            .domain(d3.extent(priceHistory, (d) => d.time * 1000))
            .range([0, this.width]);

        this.yScale = d3.scaleLinear()
            .domain(d3.extent(priceHistory, (d) => d.close))
            .range([this.height, 0]);

        const line = d3.line()
            .x((data) => this.xScale(new Date(data.time * 1000)))
            .y((data) => this.yScale(data.close))
            .context(this.ctx);

        this.ctx.beginPath();
        line(priceHistory);
        this.ctx.lineWidth = 1;
        if (priceHistory[0].close > priceHistory[priceHistory.length - 1].close) {
            this.ctx.strokeStyle = 'red';
        } else {
            this.ctx.strokeStyle = 'green';
        }
        this.ctx.stroke();
        this.ctx.closePath();
        this.renderXAxis();
        this.renderYAxis();
        this.ctx.strokeStyle = 'black';
    }

    canvasRefHandler = (el) => {
        this.canvas = el;
    }

    renderYAxis() {
        const { yTicks } = this.props;
        const {
            ctx,
            yScale,
            height
        } = this;
        const ticks = yScale.ticks(yTicks.number);
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';
        ctx.beginPath();
        ctx.moveTo(0.5, 0);
        ctx.lineTo(0.5, height);

        each(ticks, (data) => {
            ctx.moveTo(0, yScale(data));
            ctx.lineTo(-yTicks.size, yScale(data));
            ctx.fillText(`${data}`, -yTicks.size, yScale(data));
        });

        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.closePath();
    }

    renderXAxis() {
        const { xTicks } = this.props;
        const {
            ctx,
            xScale,
            height
        } = this;

        const ticks = xScale.ticks(xTicks.number);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.beginPath();

        each(ticks, (data) => {
            const hour = data.getHours();
            const minute = data.getMinutes();
            const formattedHour = hour > 12 ? hour - 12 : hour;
            const formattedMinute = minute === 0 ? '00' : minute;
            const formattedTime = `${formattedHour}:${formattedMinute}`;
            // draw notche
            ctx.moveTo(xScale(data), height);
            ctx.lineTo(xScale(data), height + xTicks.size);
            // value
            ctx.fillText(formattedTime, xScale(data), height + xTicks.size);
        });

        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.closePath();
        ctx.textAlign = 'start';
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

export default Chart;
