import React from 'react';
import { getAuth } from '../../firebase'; // Adjust the import path based on your project structure

import './Home.css';

const Home = () => {
  const { currentUser } = getAuth();

  return (
    <div className="home-page">
      <div className="welcome-message">
        <h1 className="special-text">Drive Your Dream</h1>
        <p>
          Welcome to{' '}
          <span className="logoName">CarMarket</span>{' '}
          <span className='user-text'>
          {currentUser ? ` ${currentUser.email} ` : ' Dear guest'}{' '}
          </span>
          
        </p>
      </div>
    </div>
  );
};

export default Home;
