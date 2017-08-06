import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './Header.css';
import Logo from '../Logo/Logo';

class Header extends Component {

    render() {
        return (
            <div className="Header">
                <div className="Header__logo">
                    <Logo />
                </div>
                <div className="Header__title">MoonWatch</div>
            </div>
        );
    }
}

export default Header;