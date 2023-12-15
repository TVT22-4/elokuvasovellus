import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Reviews from './components/reviews';
import ReviewsC from './components/reviewCreation';
import Movies from './components/movies';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<h1>Hyellow</h1>}/>
          <Route path='/reviews' element={<Review/>}/>
          <Route path='/createReview' element={<Create/>}/>
          <Route path='/movies' element={<GetMovies/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Review(){
  return(
    <div>
      <h1>All previous reviews below</h1>
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
