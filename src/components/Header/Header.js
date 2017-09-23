import React from 'react';
// import PropTypes from 'prop-types';
import './Header.scss';
import Logo from '../Logo/Logo';

export default function () {
    return (
        <div className="Header">
            <div className="Header__logo">
                <Logo />
            </div>
            <div className="Header__title">MoonWatch</div>
        </div>
    );
}
