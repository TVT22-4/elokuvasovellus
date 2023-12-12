import { useContext, useEffect, useState } from "react";
import { LoginContext } from "./Context";
import { jwtToken, userInfo } from "./Signals";
import axios from "axios";

function LoginPage() {

    return (
      <div>
        { jwtToken.value.length === 0 ? <LoginForm/> : 
          <button onClick={() => jwtToken.value = ''}>Logout</button>}
      </div>
    );
  }
  function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    function login(){
      axios.postForm('http://localhost:3001/user/login', {username,password})
        .then(resp => jwtToken.value = resp.data.jwtToken )
        .catch(error => console.log(error.response.data))
    }
  
    return (
      <div>
        <input value={username} onChange={e => setUsername(e.target.value)} /><br />
        <input value={password} onChange={e => setPassword(e.target.value)} /><br />
        <button onClick={login}>Login</button>
      </div>
    );
  }


export {LoginPage};