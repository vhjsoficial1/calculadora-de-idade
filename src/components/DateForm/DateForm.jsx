import React from 'react';
import './DateForm.css';
import arrow from '../../assets/images/icon-arrow.svg';

const DateForm = ({ date, setDate, onSubmit, errors }) => {
  return (
    <form onSubmit={onSubmit} className="input-container">

      <div className={`input-group ${errors.day ? 'error-input' : ''}`}>
        <label>DAY</label>
        <input
          type="number"
          placeholder="DD"
          value={date.day}
          onChange={(e) => setDate({ ...date, day: e.target.value })}
        />
        {errors.day && <span className="error-message">{errors.day}</span>}
      </div>

      <div className={`input-group ${errors.month ? 'error-input' : ''}`}>
        <label>MONTH</label>
        <input
          type="number"
          placeholder="MM"
          value={date.month}
          onChange={(e) => setDate({ ...date, month: e.target.value })}
        />
        {errors.month && <span className="error-message">{errors.month}</span>}
      </div>

      <div className={`input-group ${errors.year ? 'error-input' : ''}`}>
        <label>YEAR</label>
        <input
          type="number"
          placeholder="YYYY"
          value={date.year}
          onChange={(e) => setDate({ ...date, year: e.target.value })}
        />
        {errors.year && <span className="error-message">{errors.year}</span>}
      </div>

      <button type="submit" className="calculate-button">
        <img src={arrow} alt="Calcular" className="arrow-icon" />
      </button>
    </form>

  );
};

export default DateForm;