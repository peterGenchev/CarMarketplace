// Edit.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, get, update } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import app from '../../firebase';
import './Edit.css';

const Edit = () => {
  const { id } = useParams();
  const [editedCar, setEditedCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const database = getDatabase(app);
        const carRef = ref(database, `cars/${id}`);
        const carSnapshot = await get(carRef);

        if (carSnapshot.exists()) {
          const carData = carSnapshot.val();
          const imageUrl = await getImageUrl(id);
          setEditedCar({ id, imageUrl, ...carData });
        } else {
          console.error('Car not found');
        }
      } catch (error) {
        console.error('Error fetching car details:', error.message);
      }
    };

    fetchCarDetails();
  }, [id]);

  const getImageUrl = async (carId) => {
    try {
      const storage = getStorage(app);
      const imageRef = storageRef(storage, `carImages/${carId}`);
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.error(`Error fetching image URL for car ${carId}:`, error.message);
      return null;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const database = getDatabase(app);
      const carRef = ref(database, `cars/${id}`);
      await update(carRef, editedCar);
      navigate(`/details/${id}`);
    } catch (error) {
      console.error('Error updating car details:', error.message);
    }
  };

  const goBack = () => {
    navigate(`/details/${id}`);
  };

  if (!editedCar) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-container">
      <div className="card">
        <h1>Edit {`${editedCar.make} ${editedCar.model}`}</h1>
        <div className="edit-form">
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
          <label>
            Price:
            <input type="number" name="price" value={editedCar.price} onChange={handleInputChange} />
          </label>
          <label>
            Mileage:
            <input type="number" name="mileage" value={editedCar.mileage} onChange={handleInputChange} />
          </label>
          <label>
            Contact:
            <input type="number" name="contactUser" value={editedCar.contactUser} onChange={handleInputChange} />
          </label>
         
        </div>
        <div className="button-container">
          <button onClick={goBack}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
