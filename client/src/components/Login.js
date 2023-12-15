import { useState } from "react";
import axios from "axios";
import { jwtToken } from "./Signals";

function LoginPage() {
  return (
    <div>
      {jwtToken.value.length === 0 ? (
        <LoginForm />
      ) : (
        <div>
          <h2>Welcome</h2>
          <button onClick={() => jwtToken.value = ''}>Logout</button>
        </div>
      )}
    </div>
  );
}

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function login() {
    setError(''); 

    axios.postForm('http://localhost:3001/user/login', { username, password })
      .then(resp => jwtToken.value = resp.data.jwtToken)
      .catch(error => {
        if (error.response && error.response.status === 401) {
          setError('Incorrect username or password. Please try again.');
        } else {
          console.error('Error during login:', error.message);
        }
      });
  }

  return (
    <body>
    <div>
      <h2>Login</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} /><br />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={login}>Login</button>
    </div>
    </body>
  );
}

export { LoginPage };
