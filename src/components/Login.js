import React, { useState } from 'react';
import './styles.css';

const Login = ({ onLogin }) => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(idInstance, apiTokenInstance);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Вход в WhatsApp Chat</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ID Instance"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
          />
          <input
            type="text"
            placeholder="API Token Instance"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
          />
          <button type="submit">Войти</button>
        </form>
        <p>
          Нет аккаунта?{' '}
          <a href="https://green-api.com/" target="_blank" rel="noopener noreferrer">
            Зарегистрируйтесь
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;