import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, get, remove } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import app, { useAuth } from '../../firebase';
import Spinner from 'react-bootstrap/Spinner';
import './Catalog.css';

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser } = useAuth();
  const [noCarsFound, setNoCarsFound] = useState(false);
  const [loading, setLoading] = useState(true);

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
        setNoCarsFound(carsArray.length === 0);
      }

      setLoading(false); // Set loading to false once data is fetched
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
    const filteredCars = cars.filter((car) =>
      car.make.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setNoCarsFound(filteredCars.length === 0);

    setCars(filteredCars);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchData();
  };

  return (
    <div className={loading ? 'spinner-container' : 'container'}>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
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
            {noCarsFound ? (
              <p>No cars found</p>
            ) : (
              cars.map((car) => (
                <div key={car.id} className="card" style={{ width: '18rem' }}>
                  <img src={car.imageUrl} className="card-img-top" alt={`${car.make} ${car.model}`} />
                  <div className="card-body">
                    <h5 className="card-title">{`${car.make} ${car.model}`}</h5>
                    <p className="card-text">Year: {car.year}</p>
                    <p className="card-text">Price: {car.price} $</p>
                    {currentUser ? (
                      <Link to={`/details/${car.id}`} className="btn btn-primary">
                        Details
                      </Link>
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Catalog;