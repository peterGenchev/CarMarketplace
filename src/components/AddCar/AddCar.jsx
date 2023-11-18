
import React, { useState } from 'react';
import './AddCar.css';

const AddCar = ({ onAddCar }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!make || !model || !year || !price) {
      alert('Please fill in all fields');
      return;
    }

    // Create a new car object
    const newCar = {
      make,
      model,
      year,
      price,
    };

    // Pass the new car object to the parent component
    onAddCar(newCar);

    // Clear the form fields
    setMake('');
    setModel('');
    setYear('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>
        Add new car
      </h1>
      <label>
        Make:
        <input type="text" value={make} onChange={(e) => setMake(e.target.value)} />
      </label>
      <br />

      <label>
        Model:
        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
      </label>
      <br />

      <label>
        Year:
        <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
      </label>
      
      <label>
        Price:
        <input type="text" value={year} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <br />

      <button type="submit">Add Car</button>
    </form>
  );
};

export default AddCar;