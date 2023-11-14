
import React, { useState } from 'react';
import './AddCar.css';

const AddCar = ({ onAddCar }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!make || !model || !year) {
      alert('Please fill in all fields');
      return;
    }

    // Create a new car object
    const newCar = {
      make,
      model,
      year,
    };

    // Pass the new car object to the parent component
    onAddCar(newCar);

    // Clear the form fields
    setMake('');
    setModel('');
    setYear('');
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <br />

      <button type="submit">Add Car</button>
    </form>
  );
};

export default AddCar;