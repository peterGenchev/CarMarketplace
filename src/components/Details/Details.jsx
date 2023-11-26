import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import app from '../../firebase';
import './Details.css';

const Details = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
//   const history = useHistory();
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
    // Navigate back to the catalog page
    navigate('/catalog');
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
        <div className="detail-row">
          <p>
            <span className="info">Year:</span> <span>{car.year}</span>
          </p>
          <p>
            <span className="info">Price:</span> <span>{car.price} $</span>
          </p>
          <p>
            <span className="info">Fuel:</span> <span>{car.fuel}</span>
          </p>
          <p>
            <span className="info">Mileage:</span> <span>{car.mileage} km.</span>
          </p>
          <p>
            <span className="info">City:</span> <span>{car.city}</span>
          </p>
          {/* ... other details ... */}
        </div>
      </div>
      <button onClick={goBack}>Go Back</button>
    </div>
  </div>
);
};

export default Details;
