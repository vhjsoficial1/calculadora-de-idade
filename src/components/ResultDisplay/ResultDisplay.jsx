import React from 'react';
import './ResultDisplay.css';

const ResultDisplay = ({ result }) => {
    return (
        <div className="result-container">
        <div className="result-item">
            <span className="number">{result.years}</span>
            <span className="label">years</span>
        </div>
        <div className="result-item">
            <span className="number">{result.months}</span>
            <span className="label">months</span>
        </div>
        <div className="result-item">
            <span className="number">{result.days}</span>
            <span className="label">days</span>
        </div>
        </div>
    );
};


export default ResultDisplay;