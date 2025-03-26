import React, { useState } from 'react';
import DateForm from './components/DateForm/DateForm';
import ResultDisplay from './components/ResultDisplay/ResultDisplay';
import './App.css';

const App = () => {
  const [date, setDate] = useState({ day: '', month: '', year: '' });
  const [result, setResult] = useState({ years: '--', months: '--', days: '--' });
  const [errors, setErrors] = useState({ day: '', month: '', year: '' });

  const isLeapYear = (year) => {
    return (+year % 4 === 0 && +year % 100 !== 0) || +year % 400 === 0;
  };

  const getMaxDays = (month, year) => {
    const monthDays = {
      1: 31,
      2: isLeapYear(year) ? 29 : 28,
      3: 31, 4: 30, 5: 31, 6: 30,
      7: 31, 8: 31, 9: 30,
      10: 31, 11: 30, 12: 31
    };
    return monthDays[+month] || 31;
  };

  const validateDate = () => {
    const newErrors = { day: '', month: '', year: '' };
    let isValid = true;
    const currentYear = new Date().getFullYear();

    // Validar ano
    if (!date.year.trim()) {
      newErrors.year = 'This field is required';
      isValid = false;
    } else if (isNaN(date.year) || +date.year < 1900) {
      newErrors.year = 'Ano inválido';
      isValid = false;
    } else if (+date.year > currentYear) {
      newErrors.year = 'Must be in the past';
      isValid = false;
    }

    // Validar mês
    if (!date.month.trim()) {
      newErrors.month = 'This field is required';
      isValid = false;
    } else if (isNaN(date.month) || +date.month < 1 || +date.month > 12) {
      newErrors.month = 'Must be a valid month';
      isValid = false;
    }

    // Validar dia
    if (!date.day.trim()) {
      newErrors.day = 'This field is required';
      isValid = false;
    } else if (isNaN(date.day)) {
      newErrors.day = 'Dia inválido';
      isValid = false;
    } else {
      const maxDays = getMaxDays(date.month, date.year);
      if (+date.day < 1 || +date.day > maxDays) {
        newErrors.day = 'Must be a valid day'
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const calculateAge = (e) => {
    e.preventDefault();
    setErrors({ day: '', month: '', year: '' });

    if (!validateDate()) return;

    const birthDate = new Date(+date.year, +date.month - 1, +date.day);
    const today = new Date();

    if (birthDate > today) {
      setErrors(prev => ({ ...prev, year: 'Data futura' }));
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      const lastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days += lastDay;
      months--;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({
      years: years >= 0 ? String(years).padStart(2, '0') : '--',
      months: months >= 0 ? String(months).padStart(2, '0') : '--',
      days: days >= 0 ? String(days).padStart(2, '0') : '--'
    });
  };

  return (
    <div className="age-calculator-container">
      <DateForm 
        date={date} 
        setDate={setDate} 
        onSubmit={calculateAge} 
        errors={errors} 
      />
      <ResultDisplay result={result} />
    </div>
  );
};

export default App;