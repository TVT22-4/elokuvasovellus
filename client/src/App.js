import './App.css';
//import { useContext, useState } from "react";
//import { LoginContext } from './components/Context';
import { LoginPage } from './components/Login';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import UserData from './components/User';
import RegisterForm  from './components/Register';
import GroupList from './components/Group';
import CreateGroup from './components/CreateGroup';
import GroupPage from './components/GroupPage';
import NewsFin from './components/Xml';
import FetchNews from './components/FetchNews';

function App() {
  return (
    <BrowserRouter>
    <div>
      <nav>
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/register'}>Register</Link>
          </li>
          <li>
            <Link to={'/login'}>Login</Link>
          </li>
          <li>
            <Link to={'/user'}>User</Link>
          </li>
          <li>
            <Link to={'/group'}>Group</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/group" element={<Group />} />
        <Route path="/group/:idGroup" element={<GroupAndNewsPage />} />
        <Route path="/*" element={ <h3>Page not found</h3>} />
      </Routes>
    </div>
  </BrowserRouter>
);
}
function Home(){
  return(
    <div>
      
    </div>
  )
}

function Register(){
  return(
    <div>
      <RegisterForm />
    </div>
  )
}


function Login(){
  return(
    <div>
  <LoginPage />
    </div>
  )
}


function User(){
  return(
    <div>
      <UserData />
      
    </div>
  )
}

function Group(){
  return(
    <div>
      <GroupList />
      <CreateGroup />
    </div>
  )
}

function GroupAndNewsPage() {
  return (
    <>
      <GroupPage />
      <NewsFin />
      <FetchNews />
    </>
  );
}

export default App;