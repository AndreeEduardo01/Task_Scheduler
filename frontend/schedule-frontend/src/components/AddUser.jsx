// src/components/UserForm.jsx
import React, { useState } from 'react';

const UserForm = () => {
  
//   const [idUser, setIdUser] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [pswdUser, setPswdUser] = useState('');
  const [lastNameUser, setLastNameUser] = useState('');
  const [dniUser, setdniUser] = useState('');
  const [birthdayUser, setbirthdayUser] = useState('');
  const [roleUser, setRoleUser] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!nameUser || !lastNameUser || !dniUser || !birthdayUser) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const user = {
      password: pswdUser,
      id_role: roleUser,
      name_user: nameUser,
      lastname_user: lastNameUser,
      dni_user: parseInt(dniUser),
      birthday: birthdayUser,
    };

    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        // Resetear formulario
        setNameUser('');
        setPswdUser('');
        setLastNameUser('');
        setdniUser('');
        setbirthdayUser('');
        setRoleUser('');
        setError('');
        // aca falta agregar dni y cumpleaños
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
        <label>Name: </label>
        <input
          type="text"
          value={nameUser}
          onChange={(e) => setNameUser(e.target.value)}
        />
      </div>
      <div>
        <label>Passwod: </label>
        <input
          type="text"
          value={pswdUser}
          onChange={(e) => setPswdUser(e.target.value)}
        />
      </div>
      <div>
        <label>Last Name: </label>
        <input
          type="text"
          value={lastNameUser}
          onChange={(e) => setLastNameUser(e.target.value)}
        />
      </div>
      <div>
        <label>DNI: </label>
        <input
         type="text"
         value={dniUser}
         onChange={(e) => setdniUser(e.target.value)}
        />
      </div>
      <div>
        <label>Bithday: </label>
        <input 
        type= "date"
        value={birthdayUser}
        onChange={(e) => setbirthdayUser(e.target.value)}
        />
      </div>
      <div>
        <label>Rol: </label>
        <input 
        type="number"
        value={roleUser}
        onChange={(e) => setRoleUser(e.target.value)} />
      </div>
      <button type="submit">Add user</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default UserForm;
