import axios from "axios";
import React, { useState } from "react";
import { jwtToken} from "./Signals";

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function register() {
    axios.post('http://localhost:3001/user/register', { username, fname, lname, email, password })
      .then(resp => {
        console.log("Response:", resp);
  
        // Check if resp is defined and resp.data is defined
        if (resp && resp.data) {
          jwtToken.value = { token: resp.data.jwtToken, username }; // Change this line
        } else {
          console.error("Unexpected response format. Response:", resp);
        }
      })
      .catch(error => {
        console.error("Error during registration:", error);
  
        if (error.response && error.response.data) {
          console.log("Error response data:", error.response.data);
        }
      });
  }
  
  
  
  return (
    <div className="form">
        <h2>Crete account</h2>
        <form>
        <p>Username</p>
      <input value={username} onChange={e => setUsername(e.target.value)} /><br />
      <p>First Name</p>
      <input value={fname} onChange={e => setFname(e.target.value)} /><br />
      <p>Last Name</p>
      <input value={lname} onChange={e => setLname(e.target.value)} /><br />
      <p>Email</p>
      <input value={email} onChange={e => setEmail(e.target.value)} /><br />
      <p>Password</p>
      <input value={password} onChange={e => setPassword(e.target.value)} /><br />
      <br />
      <button onClick={register}>Register</button>
      </form>
    </div>
  );
}

