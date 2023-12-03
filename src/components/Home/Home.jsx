import React, { useEffect, useState } from 'react';
import { getAuth } from '../../firebase'; // Adjust the import path based on your project structure

import './Home.css';

const Home = () => {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Try to get the user from localStorage
    const storedUser = localStorage.getItem('currentUser');

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);

        // Save the user to localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
      });

      return () => {
        unsubscribe();
      };
    }
  }, [auth]);

  

  return (
    <div className="home-page">
      <div className="welcome-message">
        <h1 className="special-text">Drive Your Dream</h1>
        <p>
          Welcome to{' '}
          <span className="logoName">CarMarket</span>{' '}
          <span className="user-text">
            {currentUser ? ` ${currentUser.email} ` : ' Dear guest'}{' '}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Home;
