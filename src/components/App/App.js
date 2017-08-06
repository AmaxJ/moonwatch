import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Header from '../Header/Header';

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
                <Header />
            </div>
        );
    }
}

export default App;
