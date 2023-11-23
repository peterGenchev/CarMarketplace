import React, { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../../firebase';

const AddCar = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleAddCar = async () => {
    try {
      // Validate input
      if (!make || !model || !year || !price || !image) {
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
      const newCarRef = push(carsRef, {
        make,
        model,
        year,
        price,
      });

      // Upload the image to Firebase Storage
      const storage = getStorage(app);
      const imageRef = storageRef(storage, `carImages/${newCarRef.key}`);
      await uploadBytes(imageRef, image);

      // Get the URL of the uploaded image
      const imageUrl = await getDownloadURL(imageRef);

      // Update the car data with the image URL
      await newCarRef.update({
        imageUrl,
      });

      // Reset the form
      setMake('');
      setModel('');
      setYear('');
      setPrice('');
      setImage(null);

      console.log('Car added successfully!');
    } catch (error) {
      console.error('Error adding car:', error.message);
    }
  };

  return (
    <div>
      <h2>Add Car</h2>
      <form>
        <label>
          Make:
          <input type="text" value={make} onChange={(e) => setMake(e.target.value)} />
        </label>
        <br />
        <label>
          Model:
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
        </label>
        <br />
        <label>
          Year:
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </label>
        <br />
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <br />
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <br />
        <button type="button" onClick={handleAddCar}>
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
