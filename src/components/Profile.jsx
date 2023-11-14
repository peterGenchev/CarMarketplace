// src/MyProfile.js
import React from 'react';
import './Profile.css';

const Profile = () => {
  
  const profileData = {
    name: 'Peter Genchev',
    image: 'https://placekitten.com/200/200', 
    
    
  };

  return (
    <div className="profile-container">
      <img src={profileData.image} alt="Profile" />
      <h2>{profileData.name}</h2>
      <p>{profileData.bio}</p>
    </div>
  );
};

export default Profile;