import { useState } from "react"
import axios from "axios";
import { jwtToken } from "./Signals";


function LoginPage() {
  return (
    <div>
      <UserInfo/>
      <LoginForm/>
    </div>
  )
}

export default function LoginForm(){

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function login(){
      axios.post('http://localhost:3001/user/login', {username, password})
          .then(resp => jwtToken.value = resp.data.jwtToken)
          .catch(error => console.log(error.message))
  }

  return(
      <div>
          {jwtToken.value.length !== 0 ? <h2>Logged in</h2> :
          <div>
              <h2>Login</h2>
              <input onChange={e => setUsername(e.target.value)}/><br/>
              <input onChange={e => setPassword(e.target.value)}/><br/>
              <button onClick={login}>Login</button>
          </div>
      }
      </div>
  )
}

function UserInfo(){
  return(
    <div>
      {jwtToken.value ? <h1>Logged in</h1> : <h1> </h1>}
    </div>
  )
}
  export {LoginPage};