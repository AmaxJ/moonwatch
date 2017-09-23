import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Chart from '../Chart/Chart';
import PriceDisplay from '../PriceDisplay/PriceDisplay';
import { isMobile } from '../../utilities';

import './App.scss';

class App extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        priceHistory: PropTypes.array,
        lastPrice: PropTypes.object
    }

    componentDidMount() {
        this.props.actions.initialize();
    }

    maybeRenderChart() {
        const { priceHistory, lastPrice } = this.props;
        const props = {
            yTicks: {
                number: 5,
                size: 3
            },
            xAxis: { render: false },
            yAxis: { render: false }
        };

        if (priceHistory.length && !isMobile()) {
            return (
                <div className="App__chart">
                    <Chart
                      priceHistory={priceHistory}
                      lastPrice={lastPrice}
                      height={400}
                      width={600}
                      {...props} />
                </div>
            );
        }
    }

    render() {
        return (
            <div className="App">
                <Header />
                <section className="App__container">
                    <div className="App__row">
                        <div className="App__price-display">
                            <PriceDisplay lastPrice={this.props.lastPrice} />
                        </div>
                        {this.maybeRenderChart()}
                    </div>
                </section>
            </div>
        );
    }
}

export default App;
