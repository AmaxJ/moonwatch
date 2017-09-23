import React from 'react';
import PropTypes from 'prop-types';
import './PriceDisplay.scss';

function PriceDisplay(props) {

    const renderExchangeAndTradingPair = () => {
        if (!props.lastPrice) {
            return 'loading';
        }
        return (
            <div className="PriceDisplay__trading-pair">
                <div>
                    {`${props.lastPrice.fromCurrency} / ${props.lastPrice.toCurrency}`}
                </div>
                <div>
                    {props.lastPrice ? props.lastPrice.exchange : 'loading..'}
                </div>
            </div>
        );
    };

    const formatAndRenderTime = () => {
        if (!props.lastPrice) {
            return 'loading';
        }
        const date = new Date(props.lastPrice.time * 1000);
        const hour = date.getHours();
        const formattedHour = hour > 12 ? hour - 12 : hour;
        const period = hour > 12 ? 'PM' : 'AM';
        const minute = date.getMinutes();
        const formattedMinute = minute < 10 ? `0${minute}` : minute;
        return (
            <div>{`Last Updated: ${formattedHour}:${formattedMinute} ${period}`}</div>
        );
    };

    return (
        <div className="PriceDisplay">
            <div className="PriceDisplay__row">
                <div className="PriceDisplay__price">
                    {props.lastPrice ? props.lastPrice.close : 'loading..'}
                </div>
            </div>
            <div className="PriceDisplay__row">
                {renderExchangeAndTradingPair()}
            </div>
            <div className="PriceDisplay__row PriceDisplay__timestamp">
                {formatAndRenderTime()}
            </div>
        </div>
    );
}

PriceDisplay.propTypes = {
    lastPrice: PropTypes.shape({
        close: PropTypes.number,
        exchange: PropTypes.string,
        fromCurrency: PropTypes.string,
        time: PropTypes.number,
        toCurrency: PropTypes.string,
        volume24hr: PropTypes.number
    })
};


export default PriceDisplay;
