import React, { useState, useEffect } from 'react';
import { auth, getDatabase } from '../firebase'; // Import auth and getDatabase

import './Profile.css';

const Profile = () => {
  const { currentUser } = auth; // Use auth from the firebase module
  const [userCars, setUserCars] = useState([]);

  useEffect(() => {
    const fetchUserCars = async () => {
      if (currentUser) {
        try {
          // Use getDatabase to get the reference to the Realtime Database
          const database = getDatabase();
          
          const carsRef = database.ref('cars').orderByChild('userId').equalTo(currentUser.uid);
          const carsSnapshot = await carsRef.once('value');

          const carsData = Object.entries(carsSnapshot.val() || {}).map(([id, data]) => ({ id, ...data }));
          setUserCars(carsData);
        } catch (error) {
          console.error('Error fetching user cars:', error.message);
        }
      }
    };

    fetchUserCars();
  }, [currentUser]);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {currentUser && (
        <div>
          <p>Email: {currentUser.email}</p>
        </div>
      )}

      <h3>Cars Added</h3>
      {userCars.length > 0 ? (
        <ul>
          {userCars.map((car) => (
            <li key={car.id}>{car.name}</li>
            // Adjust the property used for the car name based on your data structure
          ))}
        </ul>
      ) : (
        <p>No cars created yet.</p>
      )}
    </div>
  );
};

export default Profile;
