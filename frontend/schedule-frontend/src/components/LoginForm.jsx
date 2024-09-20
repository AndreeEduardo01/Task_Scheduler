import React, { useState } from 'react';

const LoginForm = () => {
  const [dniUser, setDniUser] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dni_user: dniUser, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Almacena el token en el almacenamiento local o maneja la sesión según sea necesario
        localStorage.setItem('token', data.token);
        alert('Inicio de sesión exitoso');
        // Aquí podrías redirigir al usuario a otra página
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setErrorMessage('Error en el servidor. Inténtalo más tarde.');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dniUser">DNI:</label>
          <input
            type="text"
            id="dniUser"
            value={dniUser}
            onChange={(e) => setDniUser(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginForm;
