import React, { useState } from 'react';
import './AgeCalculator.css';
import arrow from '../../assets/images/icon-arrow.svg';

const AgeCalculator = () => {
  const [date, setDate] = useState({ day: '', month: '', year: '' });
  const [result, setResult] = useState({ years: '--', months: '--', days: '--' });

  const calculateAge = (e) => {
    e.preventDefault();
    const birthDate = new Date(`${date.year}-${date.month}-${date.day}`);
    const today = new Date();
    
    if (isNaN(birthDate)) {
      alert('Data inválida!');
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({ years, months, days });
  };

  return (
    <div className="age-calculator-container">
      <form onSubmit={calculateAge} className="input-container">
        <div className="input-group">
          <label>D A Y</label>
          <input
            type="number"
            placeholder="DD"
            value={date.day}
            onChange={(e) => setDate({...date, day: e.target.value})}
            min="1"
            max="31"
          />
        </div>

        <div className="input-group">
          <label>M O N T H</label>
          <input
            type="number"
            placeholder="MM"
            value={date.month}
            onChange={(e) => setDate({...date, month: e.target.value})}
            min="1"
            max="12"
          />
        </div>

        <div className="input-group">
          <label>Y E A R</label>
          <input
            type="number"
            placeholder="YYYY"
            value={date.year}
            onChange={(e) => setDate({...date, year: e.target.value})}
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>

        <button type="submit" className="calculate-button">
          <img
            src={arrow}
            alt="Botão de calcular"
            className='arrow-icon'
          />
        </button>
      </form>

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
    </div>
  );
};

export default AgeCalculator;