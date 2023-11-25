// src/MyProfile.js
import React from 'react';
import './Profile.css';

const Profile = () => {
  
  const profileData = {
    name: 'Peter Genchev',
    userCars: ['Car1', 'Car2', 'Car3'], // Example array of cars added by the user
  };

  return (
    <div className="profile-container">
      <h2>{profileData.name}</h2>
      <h3>Cars Added by {profileData.name}:</h3>
      <ul>
        {profileData.userCars.map((car, index) => (
          <li key={index}>{car}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
