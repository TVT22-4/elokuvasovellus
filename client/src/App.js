import './App.css';
import { useContext, useState } from "react";
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
import Reviews from './components/reviews';
import ReviewsC from './components/reviewCreation';
import Movies from './components/movies';
import CustomUser from './components/custom_user';
import Search from './components/search';
import kuva from './elokuva.jpg'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <BrowserRouter>
    <Search />
    <button id="menubutton" onClick={toggleMenu}>Menu</button>
      <div className="app-container">
       
        {isMenuOpen && (
          <nav className="menu"> 
           <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/userInfo">User Info</Link>
              </li>
              <li>
                <Link to="/group">Groups</Link>
              </li>
              <li>
                <Link to="/customUser">Watchlist</Link>
              </li>
              <li>
                <Link to="/reviews">Reviews</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userinfo" element={<User />} />
        <Route path="/group" element={<Group />} />
        <Route path="/group/:idGroup" element={<GroupAndNewsPage />} />
        <Route path="/*" element={<h3>Page not found</h3>} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/createReview" element={<Create />} />
        <Route path="/movies" element={<GetMovies />} />
        <Route path="/customUser" element={<CustomUser />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home(){
  return(
    <div>
      <Link to={'/register'}className="styled-link">Register</Link><br />
      <Link to={'/login'}className="styled-link">Login</Link><br /><br />
  <img id="logo" src={kuva} alt="Picture of the logo" /><br />
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
function Review(){
  return(
    <div>
      <h1>All previous reviews below</h1>
      <Link to={'/createReview'}className="styled-link">Create a review</Link>
      <Reviews/>
    </div>
  )
}

function Create(){
  return(
    <div>
      <h3>Create a review </h3>
      <ReviewsC/>
    </div>
  )
}

function GetMovies(){
  return(
    <div>
      <h1>Popular movies </h1>
      <Movies/>
    </div>
  )
}

export default App;