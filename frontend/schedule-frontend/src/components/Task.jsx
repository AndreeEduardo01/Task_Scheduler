// src/components/Task.jsx
import React from 'react';

const Task = ({ task }) => {
  const { description, time_init, duration_estimated } = task;
  console.log("The object 1:", task);
  console.log("The object descriptio:",task.description);
  console.log("The object time init::",task.time_init);
  console.log("The object duarion estimated::",task.duration_estimated);

  const startHour = new Date(time_init).getHours();
  const startMinutes = new Date(time_init).getMinutes();

  const durationInMinutes = duration_estimated;
  const totalAvailableMinutes = 18 * 60; // Desde 5am hasta 11pm (18 horas)
  const heightPercent = (durationInMinutes / totalAvailableMinutes) * 100;

  const taskStyle = {
    position: 'absolute',
    top: `${(startHour - 5) * 60 + startMinutes}px`,
    height: `${heightPercent}px`,
    backgroundColor: 'lightblue',
    border: '1px solid blue',
    borderRadius: '4px',
    padding: '5px',
    boxSizing: 'border-box',
    width: '100%',
  };
  console.log("Describe:",description);

  return (
    <div style={taskStyle}>
      {description}
      {/* {time_init} */}
      {duration_estimated}
    </div>
  );
};

export default Task;
