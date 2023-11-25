import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import app from '../../firebase';
import './Search.css';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const firestore = getFirestore(app);
        const carsCollection = collection(firestore, 'cars');
        const q = query(carsCollection, where('make', '>=', searchQuery));

        const carsSnapshot = await getDocs(q);

        const carsData = carsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFilteredCars(carsData);
      } catch (error) {
        console.error('Error fetching cars:', error.message);
      }
    };

    fetchCars();
  }, [searchQuery]);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
<div className="search-container">
      <input
        type="text"
        placeholder="Search by make..."
        value={searchQuery}
        onChange={handleChange}
      />
      <button className="search-btn">Search</button>
      <ul>
        {filteredCars.map((car) => (
          <li key={car.id}>{car.make} {car.model}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
