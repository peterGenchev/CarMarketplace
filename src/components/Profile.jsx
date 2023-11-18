// src/MyProfile.js
import React from 'react';
import './Profile.css';

const Profile = () => {
  
  const profileData = {
    name: 'Peter Genchev',
  };

  return (
    <div className="profile-container">
      <h2>{profileData.name}</h2>
      <p>{profileData.bio}</p>
    </div>
  );
};

export default Profile;