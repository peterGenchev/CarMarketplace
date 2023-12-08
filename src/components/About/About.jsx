// About.js
import React from 'react';
import './About.css'; 

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to our website! Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nulla facilisi. Sed vel justo nec libero aliquet ultricies.
      </p>
      <p>
        Our mission is to provide valuable information and services to our users.
        We are passionate about [your mission or topic].
      </p>
      <h2>Meet the Team</h2>
      <ul>
        <li>Ivan Georgiev - Team lead </li>
        <li>Peter Petrov - Manager</li>
        <li>Tanya Miroslavova - call center</li>
        
      </ul>
      <p>
        For any inquiries, please contact us at <a href="info@example.com">info@example.com</a>.
      </p>
    </div>
  );
};

export default About;
