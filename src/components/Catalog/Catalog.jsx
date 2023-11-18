import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'; // Import Button
import './Catalog.css';

const Catalog = () => {
  const cars = [
    { make: 'BMW', model: 'X3', year: '2023', image: 'https://di-uploads-pod23.dealerinspire.com/bmwofowingsmills/uploads/2023/02/IMG_05281.jpg' },
    { make: 'Audi', model: 'Q5', year: '2023', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHjh6NC1lryXVmd1Lx1dhvdC7Z2bm28QHn8A&usqp=CAU' },
    { make: 'Mercedes', model: 'GLC', year: '2023', image: 'https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/mercedes-benz-glc-coupe-driving-front-3_4.jpg' },
    { make: 'BMW', model: 'X3', year: '2023', image: 'https://di-uploads-pod23.dealerinspire.com/bmwofowingsmills/uploads/2023/02/IMG_05281.jpg' },
    { make: 'Audi', model: 'Q5', year: '2023', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHjh6NC1lryXVmd1Lx1dhvdC7Z2bm28QHn8A&usqp=CAU' },
    { make: 'Mercedes', model: 'GLC', year: '2023', image: 'https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/mercedes-benz-glc-coupe-driving-front-3_4.jpg' },
    { make: 'BMW', model: 'X3', year: '2023', image: 'https://di-uploads-pod23.dealerinspire.com/bmwofowingsmills/uploads/2023/02/IMG_05281.jpg' },
    { make: 'Audi', model: 'Q5', year: '2023', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHjh6NC1lryXVmd1Lx1dhvdC7Z2bm28QHn8A&usqp=CAU' },
    { make: 'Mercedes', model: 'GLC', year: '2023', image: 'https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/mercedes-benz-glc-coupe-driving-front-3_4.jpg' },
    { make: 'Mercedes', model: 'GLC', year: '2023', image: 'https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/mercedes-benz-glc-coupe-driving-front-3_4.jpg' },
    { make: 'Mercedes', model: 'GLC', year: '2023', image: 'https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/mercedes-benz-glc-coupe-driving-front-3_4.jpg' },
    { make: 'Mercedes', model: 'GLC', year: '2023', image: 'https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/mercedes-benz-glc-coupe-driving-front-3_4.jpg' },
    { make: 'Mercedes', model: 'GLC', year: '2023', image: 'https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/mercedes-benz-glc-coupe-driving-front-3_4.jpg' },
    { make: 'Mercedes', model: 'GLC', year: '2023', image: 'https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/mercedes-benz-glc-coupe-driving-front-3_4.jpg' },
    { make: 'Mercedes', model: 'GLC', year: '2023', image: 'https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/mercedes-benz-glc-coupe-driving-front-3_4.jpg' },
    // Add more cars as needed
  ];

  return (
    <div className="catalog-container">
      <div className="row">
        {cars.map((car, index) => (
          <div key={index} className="col-md-3 mb-4">
            <Card style={{ width: '100%' }}>
              <Card.Img variant="top" src={car.image} alt={`${car.make} ${car.model}`} />
              <Card.Body>
                <Card.Title>{`${car.make} ${car.model} ${car.year}`}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Button variant="primary">View more</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
