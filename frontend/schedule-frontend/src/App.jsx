// src/App.jsx
import React, { useState } from 'react';
import Schedule from './components/Schedule';
import TaskForm from './components/TaskForm';
import AddTask from './components/AddTask';
import UserForm from './components/AddUser';
import WeekSelector from './components/WeekSelector';
import LoginForm from './components/LoginForm';
import './App.css';

const App = () => {
  // Estados para controlar la visibilidad de los formularios
  const [showAddTask, setShowAddTask] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showWeekForm, setShowWeekForm] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  // Estados para el año y la semana seleccionada
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedWeek, setSelectedWeek] = useState(1);


  return (
    <div>
      {/* <LoginForm /> */}
      <h1>Mi Horario</h1>
      <div className="button-container">
        {/* Botón para mostrar/ocultar TaskForm */}
        <button onClick={() => setShowTaskForm(true)}>+ Task</button>
        {/* Botón para mostrar/ocultar AddUser */}
        <button onClick={() => setShowAddUser(true)}>+ User </button>
        {/* Botón para  mostrar Selector de Semana */}
        <button onClick={() => setShowWeekForm(true)}> * Week </button>
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

      {/* Si showAddUser es true, mostramos el formulario como modal */}
      {showAddUser && (
        <>
          <div className="overlay" onClick={() => setShowAddUser(false)}></div>
          <div className="modal">
            <UserForm />
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

      {/* Si showWeekForm es true, mostramos el formulario como modal */}
      {showWeekForm && (
        <>
          <div className="overlay" onClick={() => setShowWeekForm(false)}></div>
          <div className="modal">
            <WeekSelector
              onWeekChange={(year, week) => {
                setSelectedYear(year);
                setSelectedWeek(week);
              }}
            />
            <button onClick={() => setShowWeekForm(false)}>Ocultar Week Form</button>
          </div>
        </>
      )}

      {/* Pasamos los estados y funciones de actualización a Schedule */}
      <Schedule selectedYear={selectedYear} selectedWeek={selectedWeek} />
    </div>
  );
};

export default App;
