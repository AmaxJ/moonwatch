import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Header from '../Header/Header';
import Chart from '../Chart/Chart';

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
            xTicks: {
                number: 6,
                size: 6
            },
            yTicks: {
                number: 5,
                size: 6
            }
        };

        if (priceHistory.length) {
            return (
                <div className="App__chart">
                    <Chart
                      priceHistory={priceHistory}
                      lastPrice={lastPrice}
                      height={400}
                      width={400}
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
