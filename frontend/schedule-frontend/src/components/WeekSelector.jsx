import React, { useState } from 'react';

// Función para obtener el número de la semana asegurando que la semana 1 empieza el lunes 1 de enero de 2024
const getWeekNumber = (date) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfWeek = startOfYear.getDay(); // Obtener el día de la semana del 1 de enero

  // Asegurar que la semana 1 comience el lunes 1 de enero o el primer lunes posterior
  const firstMonday = dayOfWeek === 1 ? startOfYear : new Date(startOfYear.setDate(startOfYear.getDate() + (8 - dayOfWeek) % 7));

  // Calcular la diferencia en días desde el primer lunes
  const daysSinceFirstMonday = Math.floor((date - firstMonday) / 86400000);

  // Devolver el número de semana (contando desde el primer lunes)
  return daysSinceFirstMonday >= 0 ? Math.floor(daysSinceFirstMonday / 7) + 1 : 1;
};

const WeekSelector = ({ onWeekChange }) => {
  const [year, setYear] = useState(new Date().getFullYear());

  // Establece la semana actual usando la lógica ajustada
  const [week, setWeek] = useState(getWeekNumber(new Date()));

  // Función para obtener el número total de semanas en el año
  const getWeeksInYear = (year) => {
    const lastDayOfYear = new Date(year, 11, 31);
    const dayOfWeek = new Date(year, 0, 1).getDay(); // Día de la semana del 1 de enero

    // Calcular el primer lunes del año
    const firstMonday = dayOfWeek === 1 ? new Date(year, 0, 1) : new Date(year, 0, 1 + (8 - dayOfWeek) % 7);

    const dayDifference = (lastDayOfYear - firstMonday) / 86400000;
    return Math.ceil(dayDifference / 7) + 1; // +1 para incluir la primera semana completa
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setYear(newYear);
    setWeek(getWeekNumber(new Date(newYear, 0, 1))); // Actualizar semana con el nuevo año
    onWeekChange(newYear, week);
  };

  const handleWeekChange = (e) => {
    const newWeek = parseInt(e.target.value);
    setWeek(newWeek);
    onWeekChange(year, newWeek);
  };

  return (
    <form>
      <div>
        <label htmlFor="year">Year:</label>
        <select id="year" value={year} onChange={handleYearChange}>
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
    </form>
  );
};

export default WeekSelector;
