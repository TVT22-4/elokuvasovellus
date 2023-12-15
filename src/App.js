import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import CustomUser from './components/custom_user';
import Search from './components/search';



function App() {
  return (
    <BrowserRouter>
     <Link to={'/customUser'}>User</Link>
     <Search/>
      <Routes>
        <Route path = '/customUser' element = {<CustomUser/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
