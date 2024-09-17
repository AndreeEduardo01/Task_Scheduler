
// src/components/AddTask.jsx
import React, { useState, useEffect } from 'react';

const AddTask = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');
  const [timeInit, setTimeInit] = useState('');
  const [durationEstimated, setDurationEstimated] = useState('');
  const [EndTimeEstimated, setEndTimeEstimated] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [users, setUsers] = useState([]);

  // Obtener las tareas y los usuarios disponibles del backend
  useEffect(() => {
    fetch('/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));

    fetch('/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log('Error fetching users:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSchedule = {
      id_task: parseInt(selectedTask),
      time_init: timeInit,
      duration_estimated: parseInt(durationEstimated),
      assigned_to: parseInt(assignedTo),
      assigned_by: parseInt(1),
      time_end_estimated: parseInt(EndTimeEstimated)
    };
    console.log("New  ",JSON.stringify(newSchedule));

    fetch('/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSchedule),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Task scheduled successfully!');
        // Aquí puedes limpiar el formulario o hacer cualquier otra acción
      })
      .catch((error) => {
        console.error('Error scheduling task:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Task:</label>
        <select value={selectedTask} onChange={(e) => setSelectedTask(e.target.value)}>
          <option value="">Select a task</option>
          {tasks.map((task) => (
            <option key={task.id_task} value={task.id_task}>
              {task.description}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Assigned To:</label>
        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
          <option type="number" value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id_user} value={user.id_user}>
              {user.name_user}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Start Time:</label>
        <input
          type="datetime-local"
          value={timeInit}
          onChange={(e) => setTimeInit(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Estimated Duration (minutes):</label>
        <input
          type="number"
          value={durationEstimated}
          onChange={(e) => setDurationEstimated(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Estimated end time :</label>
        <input
          type="number"
          value={EndTimeEstimated}
          onChange={(e) => setEndTimeEstimated(e.target.value)}
          required
        />
      </div>

      <button type="submit">Schedule Task</button>
    </form>
  );
};

export default AddTask;
