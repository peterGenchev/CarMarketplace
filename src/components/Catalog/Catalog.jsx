import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, get, remove } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import app from '../../firebase';
import './Catalog.css';

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const fetchData = async () => {
    try {
      const database = getDatabase(app);
      const carsRef = ref(database, 'cars');
      const carsSnapshot = await get(carsRef);

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

  useEffect(() => {
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

  const handleSearch = () => {
    // Implement search logic here
    // Filter the cars based on the entered searchQuery
    const filteredCars = cars.filter((car) =>
      car.make.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Update the state with the filtered cars
    setCars(filteredCars);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    // Reset the search query and fetch all cars again
    setSearchQuery('');
    fetchData(); // Call the fetchData function here
  };

  return (
    <div className="container">
      <h1>Catalog</h1>
      <div className="search-container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Search by make..."
            value={searchQuery}
            onChange={handleChange}
          />
        </div>
        <div className="btn-container">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
          <button className="btn btn-secondary" onClick={handleClearSearch}>
            Clear
          </button>
        </div>
      </div>
      <div className="card-list">
        {cars.map((car) => (
          <div key={car.id} className="card" style={{ width: '18rem' }}>
            <img src={car.imageUrl} className="card-img-top" alt={`${car.make} ${car.model}`} />
            <div className="card-body">
              <h5 className="card-title">{`${car.make} ${car.model}`}</h5>
              <p className="card-text">Year: {car.year}</p>
              <p className="card-text">Price: {car.price} $</p>
              <Link to={`/details/${car.id}`} className="btn btn-primary">
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
