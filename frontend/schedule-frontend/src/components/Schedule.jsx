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

const Schedule = ({ selectedYear, selectedWeek }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const startOfWeek = getStartOfWeek(selectedYear, selectedWeek);
    const endOfWeek = getEndOfWeek(startOfWeek);

    // Ajustar fetch para obtener tareas de la semana seleccionada desde la tabla 'scheduled'
    fetch(`/scheduled?start=${startOfWeek.toISOString()}&end=${endOfWeek.toISOString()}`)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  }, [selectedYear, selectedWeek]);

  const getTasksForDay = (day) => {
    const filteredTasks = tasks.filter(task => {
      const taskDate = new Date(task.time_init);
      const taskDay = taskDate.getDay();
      // Convertir taskDay de 0-6 (domingo a sábado) a 1-7 (lunes a domingo)
      return taskDay === (day === 0 ? 7 : day);
    });
    return filteredTasks;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', height: '1000px', border: '1px solid white', overflowX: 'auto', overflowY: 'hidden' }}>
        {daysOfWeek.map((day, index) => (
          <div key={day} style={{ flex: 1, borderLeft: '1px solid white', padding: '10px', position: 'relative' }}>
            <h3>{day}</h3>
            <div style={{ position: 'relative', height: '1000px' }}>
              {getTasksForDay(index + 1).length === 0 ? (
                <small>No task Scheduled</small>
              ) : (
                getTasksForDay(index + 1).map((task) => (
                  <Task key={task.id_task} task={task} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
