// src/components/WeekSelector.jsx
import React, { useState } from 'react';

const WeekSelector = ({ onWeekChange }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [week, setWeek] = useState(1);

  // Obtener el número de semanas en un año (aproximadamente 52 semanas)
  const getWeeksInYear = (year) => {
    const lastDayOfYear = new Date(year, 11, 31);
    const firstDayOfYear = new Date(year, 0, 1);
    const dayOfWeek = firstDayOfYear.getDay() || 7; // Lunes es 1
    const dayDifference = (lastDayOfYear - firstDayOfYear + (dayOfWeek - 1) * 86400000) / 86400000;
    return Math.ceil(dayDifference / 7);
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setYear(newYear);
    onWeekChange(newYear, week); // Actualizar la semana seleccionada
  };

  const handleWeekChange = (e) => {
    const newWeek = parseInt(e.target.value);
    setWeek(newWeek);
    onWeekChange(year, newWeek); // Actualizar la semana seleccionada
  };

  return (
    <div>
      <label htmlFor="year">Year:</label>
      <select id="year" value={year} onChange={handleYearChange}>
        {/* Puedes ajustar el rango de años */}
        {[...Array(10).keys()].map((i) => {
          const displayYear = new Date().getFullYear() - i;
          return (
            <option key={displayYear} value={displayYear}>
              {displayYear}
            </option>
          );
        })}
      </select>

      <label htmlFor="week">Week:</label>
      <select id="week" value={week} onChange={handleWeekChange}>
        {Array.from({ length: getWeeksInYear(year) }, (_, i) => i + 1).map((weekNum) => (
          <option key={weekNum} value={weekNum}>
            Week {weekNum}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WeekSelector;
