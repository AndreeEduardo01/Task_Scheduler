// src/components/Schedule.jsx
import React, { useEffect, useState } from 'react';
import Task from './Task.jsx';
import WeekSelector from './WeekSelector.jsx';

// Los días de la semana que usarás como referencia en la UI
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Función auxiliar para obtener el primer día (lunes) de la semana
const getStartOfWeek = (year, week) => {
  const firstDayOfYear = new Date(year, 0, 1);
  const dayOfWeek = firstDayOfYear.getDay() || 7; // Lunes es 1
  const dayOffset = week * 7 - (dayOfWeek - 1);
  return new Date(year, 0, dayOffset);
};

// Función auxiliar para obtener el último día (domingo) de la semana
const getEndOfWeek = (startOfWeek) => {
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Añadir 6 días al lunes para obtener el domingo
  return endOfWeek;
};

const Schedule = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedWeek, setSelectedWeek] = useState(1);

  useEffect(() => {
    const startOfWeek = getStartOfWeek(selectedYear, selectedWeek);
    const endOfWeek = getEndOfWeek(startOfWeek);

    // Ajustar fetch para obtener tareas de la semana seleccionada
    fetch(`/tasks?start=${startOfWeek.toISOString()}&end=${endOfWeek.toISOString()}`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, [selectedYear, selectedWeek]);

  const getTasksForDay = (day) => {
    return tasks.filter(task => new Date(task.time_init).getDay() === day);
  };

  return (
    <div>
      <WeekSelector onWeekChange={(year, week) => { setSelectedYear(year); setSelectedWeek(week); }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', height: '800px', border: '1px solid black', overflowY: 'auto' }}>
        {daysOfWeek.map((day, index) => (
          <div key={day} style={{ flex: 1, borderLeft: '1px solid black', padding: '10px' }}>
            <h3>{day}</h3>
            <div style={{ position: 'relative', height: '100%', width: '100%' }}>
              {getTasksForDay(index + 1).map((task) => (
                <Task key={task.id_task} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
