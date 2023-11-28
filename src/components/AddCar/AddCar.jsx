import React, { useState } from 'react';
import { getDatabase, ref, push, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../../firebase';
import './AddCar.css';

const AddCar = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [mileage, setMileage] = useState('');
  const [city, setCity] = useState('');
  const [fuel, setFuel] = useState('');
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleAddCar = async () => {
    try {
      // Validate input
      if (!make || !model || !year || !price || !image || !fuel || !city || !mileage) {
        console.error('Please fill in all fields and provide an image');
        return;
      }

      // Validate numeric input
      if (isNaN(parseInt(year, 10)) || isNaN(parseFloat(price))) {
        console.error('Year and Price must be valid numbers');
        return;
      }

      // Get the reference to the 'cars' node in the database
      const database = getDatabase(app);
      const carsRef = ref(database, 'cars');

      // Push the new car data to the 'cars' node in the database
      const newCarRef = push(carsRef);

      // Upload the image to Firebase Storage
      const storage = getStorage(app);
      const imageRef = storageRef(storage, `carImages/${newCarRef.key}`);
      await uploadBytes(imageRef, image);

      // Get the URL of the uploaded image
      const imageUrl = await getDownloadURL(imageRef);

      // Set the car data including the image URL
      await set(newCarRef, {
        make,
        model,
        year,
        price,
        mileage,
        fuel,
        city,
        imageUrl, // Include the image URL in the car data
      });

      // Reset the form
      setMake('');
      setModel('');
      setYear('');
      setPrice('');
      setMileage('');
      setFuel('');
      setCity('');
      setImage(null);

      console.log('Car added successfully!');
      navigate('/catalog');
    } catch (error) {
      console.error('Error adding car:', error.message);
    }
  };

  return (
    <div className="add-car-container">
      <h2>Add Car</h2>
      <form className="add-car-form">
        <label>
          Make:
          <input type="text" value={make} onChange={(e) => setMake(e.target.value)} />
        </label>
        <label>
          Model:
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
        </label>
        <label>
          Year:
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label>
          Fuel:
          <input type="text" value={fuel} onChange={(e) => setFuel(e.target.value)} />
        </label>
        <label>
          Mileage:
          <input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} />
        </label>
        <label>
          City:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <button type="button" onClick={handleAddCar}>
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
