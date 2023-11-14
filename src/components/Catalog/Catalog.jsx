import React from 'react';
import './Catalog.css';

const Catalog = () => {
  const cars = [
    { make: 'BMW', model: 'X3', year: '2023', image: 'https://di-uploads-pod23.dealerinspire.com/bmwofowingsmills/uploads/2023/02/IMG_05281.jpg' },
    { make: 'Audi', model: 'Q5', year: '2023', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHjh6NC1lryXVmd1Lx1dhvdC7Z2bm28QHn8A&usqp=CAU' },
    { make: 'Mercedes', model: 'GLC', year: '2023', image: 'https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/mercedes-benz-glc-coupe-driving-front-3_4.jpg' },
    // Add more cars as needed
  ];

  return (
    <div className="container">
      <h1>Car Catalog</h1>
      <ul className="card-list">
        {cars.map((car, index) => (
          <li key={index} className="card">
            <img src={car.image} alt={`${car.make} ${car.model}`} />
            <div className="card-content">
              <h2>{car.year} {car.make} {car.model}</h2>
              {/* Additional details can be added here */}
              <p>Details: ...</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catalog;
