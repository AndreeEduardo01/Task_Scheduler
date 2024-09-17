// src/App.jsx
import React, { useState } from 'react';
import Schedule from './components/Schedule';
import TaskForm from './components/TaskForm';
import AddTask from './components/AddTask';
import './App.css';

const App = () => {
  // Estados para controlar la visibilidad de los formularios
  const [showAddTask, setShowAddTask] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  return (
    <div>
      <h1>Mi Horario</h1>

      <div className="button-container">
        {/* Botón para mostrar/ocultar TaskForm */}
        <button onClick={() => setShowTaskForm(true)}>+ Task</button>
        
        {/* Botón para mostrar/ocultar AddTask */}
        <button onClick={() => setShowAddTask(true)}>Schedule !</button>
      </div>

      {/* Si showTaskForm es true, mostramos el formulario como modal */}
      {showTaskForm && (
        <>
          <div className="overlay" onClick={() => setShowTaskForm(false)}></div>
          <div className="modal">
            <TaskForm />
            <button onClick={() => setShowTaskForm(false)}>Ocultar TaskForm</button>
          </div>
        </>
      )}

      {/* Si showAddTask es true, mostramos el formulario como modal */}
      {showAddTask && (
        <>
          <div className="overlay" onClick={() => setShowAddTask(false)}></div>
          <div className="modal">
            <AddTask />
            <button onClick={() => setShowAddTask(false)}>Ocultar AddTask</button>
          </div>
        </>
      )}

      <Schedule />
    </div>
  );
};

export default App;
