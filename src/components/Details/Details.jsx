import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, get, remove } from 'firebase/database';
import { getStorage, ref as storageRef, deleteObject, getDownloadURL } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../../firebase';
import './Details.css';
 
const Details = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const database = getDatabase(app);
        const carRef = ref(database, `cars/${id}`);
        const carSnapshot = await get(carRef);

        if (carSnapshot.exists()) {
          const carData = carSnapshot.val();
          const imageUrl = await getImageUrl(id);
          setCar({ id, imageUrl, ...carData });
        } else {
          console.error('Car not found');
        }
      } catch (error) {
        console.error('Error fetching car details:', error.message);
      }
    };

    const auth = getAuth(app);

    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); 
    });

    fetchCarDetails();

    
    return () => unsubscribe();
  }, [id]);

  const getImageUrl = async (carId) => {
    try {
      const storage = getStorage(app);
      const imageRef = storageRef(storage, `carImages/${carId}`);
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.error(`Error fetching image URL for car ${carId}:`, error.message);
      return null;
    }
  };

  const isOwner = currentUser && car && currentUser.uid === car.ownerId;

  const handleDelete = async () => {
    const userConfirmed = window.confirm('Are you sure you want to delete this car?');

    if (userConfirmed) {
      try {
        const database = getDatabase(app);
        const carRef = ref(database, `cars/${id}`);
        await remove(carRef);

       
        const storage = getStorage(app);
        const imageRef = storageRef(storage, `carImages/${id}`);
        await deleteObject(imageRef);

        navigate('/catalog');
      } catch (error) {
        console.error('Error deleting car:', error.message);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const goBack = () => {
    navigate('/catalog');
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-container">
      <div className="card">
        <h1>{`${car.make} ${car.model}`}</h1>
        <img src={car.imageUrl} alt={`${car.make} ${car.model}`} />
        <div className="details-info">
          <p>
            <span className="info">Year:</span> <span>{car.year}</span>
          </p>
          <p>
            <span className="info">Price:</span> <span>{car.price} $</span>
          </p>
          <p>
            <span className="info">City:</span> <span>{car.city}</span>
          </p>
          <p>
            <span className="info">Fuel:</span> <span>{car.fuel}</span>
          </p>
          <p>
            <span className="info">Mileage:</span> <span>{car.mileage} km</span>
          </p>
          <p>
            <span className="info">Contact:</span> <span> {car.contactUser}</span>
          </p>
         
        </div>
        <div className="button-container">
          <button onClick={goBack}>Go Back</button>
          {isOwner && (
            <>
              <button onClick={handleEdit}>Edit</button>
              <button className='delete-btn' onClick={handleDelete}>Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
