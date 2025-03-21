import React, { useState } from 'react';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState({
    day: '',
    month: '',
    year: ''
  });

  const [age, setAge] = useState({
    years: '--',
    months: '--',
    days: '--'
  });

  const handleCalculateAge = (e) => {
    e.preventDefault();
    
    // Lógica de cálculo
    const today = new Date();
    const birthDateObj = new Date(
      `${birthDate.year}-${birthDate.month}-${birthDate.day}`
    );

    if (isNaN(birthDateObj)) {
      alert('Data inválida!');
      return;
    }

    let years = today.getFullYear() - birthDateObj.getFullYear();
    let months = today.getMonth() - birthDateObj.getMonth();
    let days = today.getDate() - birthDateObj.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="age-calculator">
      <form onSubmit={handleCalculateAge}>
        <div className="input-group">
          <label>DAY</label>
          <input
            type="number"
            placeholder="24"
            value={birthDate.day}
            onChange={(e) => setBirthDate({...birthDate, day: e.target.value})}
          />
        </div>

        <div className="input-group">
          <label>MONTH</label>
          <input
            type="number"
            placeholder="09"
            value={birthDate.month}
            onChange={(e) => setBirthDate({...birthDate, month: e.target.value})}
          />
        </div>

        <div className="input-group">
          <label>YEAR</label>
          <input
            type="number"
            placeholder="1984"
            value={birthDate.year}
            onChange={(e) => setBirthDate({...birthDate, year: e.target.value})}
          />
        </div>

        <button type="submit">Calcular</button>
      </form>

      <div className="result">
        <h1>
          <span>{age.years}</span> years<br />
          <span>{age.months}</span> months<br />
          <span>{age.days}</span> days
        </h1>
      </div>
    </div>
  );
};

export default AgeCalculator;