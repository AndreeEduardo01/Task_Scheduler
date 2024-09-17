// src/components/TaskForm.jsx
import React, { useState } from 'react';

const TaskForm = () => {
  
  const [idKindoftask, setIdKindoftask] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!idKindoftask || !description || !createdBy) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const task = {
      id_kindoftask: parseInt(idKindoftask, 10),
      description,
      created_by: parseInt(createdBy, 10),
    };

    try {
      const response = await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (response.ok) {
        // Resetear formulario
        setIdKindoftask('');
        setDescription('');
        setCreatedBy('');
        setError('');
      } else {
        setError('Error al crear la tarea.');
      }
    } catch (error) {
      setError('Error en la solicitud.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ID Kind of Task:</label>
        <input
          type="number"
          value={idKindoftask}
          onChange={(e) => setIdKindoftask(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Created By (User ID):</label>
        <input
          type="number"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
        />
      </div>
      <button type="submit">Add Task</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default TaskForm;
