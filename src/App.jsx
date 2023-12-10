import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AddCar from './components/AddCar/AddCar';
import About from './components/About/About';
import Catalog from './components/Catalog/Catalog';
import Details from './components/Details/Details';
import EditCar from './components/Edit/Edit';
import Page404 from './components/Page404/Page404';



function App() {
  return (
    <div className="background-image">
      <Navigation />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/addCar' element={<AddCar />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/about' element={<About />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/edit/:id" element={<EditCar />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
