// Details.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, get, update } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import app from '../../firebase';
import EditCar from '../Edit/Edit';
import './Details.css';

const Details = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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
          setCar({ id, imageUrl, ...carData });
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

  const goBack = () => {
    navigate('/catalog');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = async (editedCar) => {
    try {
      const database = getDatabase(app);
      const carRef = ref(database, `cars/${id}`);
      
      // Update the car details in the database
      await update(carRef, editedCar);

      setIsEditing(false);

      // If needed, you can fetch and update the car details again
      // to reflect the changes in the UI
      // await fetchCarDetails();
    } catch (error) {
      console.error('Error saving edited car:', error.message);
    }
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-container">
      <div className="card">
        <h1>{`${car.make} ${car.model}`}</h1>
        <img src={car.imageUrl} alt={`${car.make} ${car.model}`} />
        <div className="details-info">
          <p>
            <span className="info">Year:</span> <span>{car.year}</span>
          </p>
          <p>
            <span className="info">Price:</span> <span>{car.price} $</span>
          </p>
          <p>
            <span className="info">City:</span> <span>{car.city}</span>
          </p>
          <p>
            <span className="info">Fuel:</span> <span>{car.fuel}</span>
          </p>
          <p>
            <span className="info">Mileage:</span> <span>{car.mileage} km</span>
          </p>
          {/* Add more paragraphs for other properties */}
        </div>
        <div className="button-container">
          <button onClick={goBack}>Go Back</button>
          <button onClick={handleEdit}>Edit</button>
        </div>
      </div>
      {isEditing && <EditCar car={car} onCancel={handleCancelEdit} onSave={handleSaveEdit} />}
    </div>
  );
};

export default Details;
