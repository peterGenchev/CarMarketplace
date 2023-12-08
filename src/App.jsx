import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';
// import Profile from './components/Profile';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AddCar from './components/AddCar/AddCar';
import About from './components/About/About';
import Catalog from './components/Catalog/Catalog';
import Details from './components/Details/Details';
import EditCar from './components/Edit/Edit';

function App() {
  return (
    <>
    <div className="background-image">
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path='/register' element= {<Register/>} />
        <Route path='/addCar' element= {<AddCar/>} />
        <Route path='/catalog' element= {<Catalog/>} />
        <Route path='/about' element= {<About/>} />
        <Route path="/details/:id" element={ <Details/> } />
        <Route path="/edit/:id" element={ <EditCar/> } />
      </Routes>
      
    </div>
    </>
  );
}

export default App;
