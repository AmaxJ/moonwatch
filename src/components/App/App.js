import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Header from '../Header/Header';
import Chart from '../Chart/Chart';

class App extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        priceHistory: PropTypes.array
    }

    componentDidMount() {
        this.props.actions.initialize();
    }

    maybeRenderChart() {
        const { priceHistory } = this.props;
        if (priceHistory.length) {
            return (
                <div className="App__chart">
                    <Chart
                      priceHistory={priceHistory}
                      height={400}
                      width={400} />
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
