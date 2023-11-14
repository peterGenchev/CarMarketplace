// src/MyProfile.js
import React from 'react';
import './Profile.css';

const Profile = () => {
  
  const profileData = {
    name: 'Peter Genchev',
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fsignalvnoise.com%2Fposts%2F3104-behind-the-scenes-reinventing-our-default-profile-pictures&psig=AOvVaw2iYRDDfPUq4Obtsy1aosiz&ust=1700080545167000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPCHhNqrxIIDFQAAAAAdAAAAABAE', 
    
    
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