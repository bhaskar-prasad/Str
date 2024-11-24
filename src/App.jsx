import React, { useState } from 'react';
import Login from './components/Login';
import HomePage from './components/HomePage';

const App = () => {
  const [userId, setUserId] = useState(null);

  return (
    <div>
      {userId ? (
        <HomePage userId={userId} />
      ) : (
        <Login onLogin={(id) => setUserId(id)} />
      )}
    </div>
  );
};

export default App;
