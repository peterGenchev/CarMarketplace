import React from 'react';
import './Page404.css';

const page404 = () => {
  return (
    <div className="not-found-container" key="not-found">
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default page404;