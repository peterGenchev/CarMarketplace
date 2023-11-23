import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, get, child } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import app from '../../firebase';
import './Catalog.css'; // Import your Catalog.css file

const Catalog = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const database = getDatabase(app);
        const carsRef = ref(database, 'cars');
        const carsSnapshot = await get(child(carsRef, '/'));

        if (carsSnapshot.exists()) {
          const carsData = carsSnapshot.val();
          const carsArray = await Promise.all(
            Object.entries(carsData).map(async ([id, car]) => {
              const imageUrl = await getImageUrl(id);
              return { id, imageUrl, ...car };
            })
          );
          setCars(carsArray);
        }
      } catch (error) {
        console.error('Error fetching cars:', error.message);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div className="container">
      <h1>Car Catalog</h1>
      <ul className="card-list">
        {cars.map((car) => (
          <li key={car.id} className="card">
            <img src={car.imageUrl} alt={`${car.make} ${car.model}`} />
            <div className="card-content">
              <h2>{`${car.make} ${car.model}`}</h2>
              <p>Year: {car.year}</p>
              <p>Price: ${car.price}</p>
              <Link to={`/details/${car.id}`}>
                <button className="details-button">Details</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catalog;
