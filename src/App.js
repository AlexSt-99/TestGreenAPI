import React, { useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';

const App = () => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (id, token) => {
    setIdInstance(id);
    setApiTokenInstance(token);
    setLoggedIn(true);
  };

  return (
    <div>
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Chat idInstance={idInstance} apiTokenInstance={apiTokenInstance} />
      )}
    </div>
  );
};

export default App;