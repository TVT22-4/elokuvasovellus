import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import CustomUser from './components/custom_user';


function App() {
  return (
    <BrowserRouter>
     <Link to={'/customUser'}>User x</Link>
      <Routes>
        <Route path = '/customUser' element = {<CustomUser/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

