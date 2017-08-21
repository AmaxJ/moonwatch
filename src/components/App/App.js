import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ZeroEx } from '0x.js';
import './App.css';
import Header from '../Header/Header';
import Chart from '../Chart/Chart';

class App extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        priceHistory: PropTypes.array,
        lastPrice: PropTypes.object,
        web3: PropTypes.object
    }

    componentDidMount() {
        this.props.actions.initialize();
        this.zeroEx = new ZeroEx(this.props.web3);
        this.Init0x();
    }

    async Init0x() {
        try {
            const availableAddresses = await this.zeroEx.getAvailableAddressesAsync();
            console.log(availableAddresses);
        } catch (error) {
            console.log('Caught error: ', error);
        }
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

        if (priceHistory.length) {
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
                    {this.maybeRenderChart()}
                </section>
            </div>
        );
    }
}

export default App;
