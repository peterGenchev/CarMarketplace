import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <>
    <div className="background-image">
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element= {<Register/>} />
      </Routes>
      
    </div>
    </>
  );
}

export default App;
