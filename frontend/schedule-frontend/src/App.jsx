// src/App.jsx
import React from 'react';
import Schedule from './components/Schedule';
import TaskForm from './components/TaskForm';
import AddTask from './components/AddTask';
import WeekSelector from './components/WeekSelector';

const App = () => {
  return (
    <div>
      <h1>Mi Horario</h1>
      <AddTask />
      <TaskForm />
      <WeekSelector />
      <Schedule />
    </div>
  );
};

export default App;
