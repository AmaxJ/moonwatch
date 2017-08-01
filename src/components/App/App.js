import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../../logo.svg';
import './App.css';

class App extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.actions.initialize();
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
