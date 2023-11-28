// EditCar.js
import React, { useState } from 'react';
import './Edit.css';

const EditCar = ({ car, onCancel, onSave }) => {
  const [editedCar, setEditedCar] = useState({ ...car });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedCar);
  };

  return (
    <div className="edit-container">
      <h2>Edit Car</h2>
      <form className="edit-form">
        <label>
          Make:
          <input type="text" name="make" value={editedCar.make} onChange={handleInputChange} />
        </label>
        <label>
          Model:
          <input type="text" name="model" value={editedCar.model} onChange={handleInputChange} />
        </label>
        <label>
          Year:
          <input type="number" name="year" value={editedCar.year} onChange={handleInputChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" value={editedCar.city} onChange={handleInputChange} />
        </label>
        {/* Add more input fields for other properties */}
      </form>
      <div className="edit-buttons">
        <button className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditCar;