import React, { useState } from 'react';
import { getDatabase, ref, push, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../../firebase';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './AddCar.css';

const AddCar = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [mileage, setMileage] = useState('');
  const [city, setCity] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('');
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const navigate = useNavigate();

  const getCurrentUser = () => {
    return new Promise((resolve) => {
      const auth = getAuth(app);
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe(); // Unsubscribe once the user information is obtained
        resolve(user);
      });
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleShowModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleFuelChange = (e) => {
    setSelectedFuel(e.target.value);
  };

  const handleAddCar = async () => {
    try {
      // Validate input
      if (!make || !model || !year || !price || !image || !selectedFuel || !city || !mileage) {
        handleShowModal('Please fill in all fields and provide an image');
        return;
      }

      // Validate numeric input
      if (isNaN(parseInt(year, 10)) || isNaN(parseFloat(price))) {
        handleShowModal('Year and Price must be valid numbers');
        return;
      }

      // Get the current user information
      const currentUser = await getCurrentUser();

      // Check if currentUser is available
      if (!currentUser) {
        handleShowModal('Current user not found');
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

      // Set the car data including the image URL and owner ID
      await set(newCarRef, {
        make,
        model,
        year,
        price,
        mileage,
        fuel: selectedFuel,
        city,
        imageUrl,
        ownerId: currentUser.uid,
      });

      // Show the success modal
      handleShowModal('Car added successfully!');

      // Reset the form
      setMake('');
      setModel('');
      setYear('');
      setPrice('');
      setMileage('');
      setCity('');
      setSelectedFuel('');
      setImage(null);

      // Navigate to the catalog page after a delay
      setTimeout(() => {
        handleCloseModal();
        navigate('/catalog');
      }, 2000);
    } catch (error) {
      console.error('Error adding car:', error.message);
      // Show an error modal if needed
      handleShowModal('Error adding car. Please try again.');
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
          <select value={selectedFuel} onChange={handleFuelChange}>
            <option value="">Select Fuel Type</option>
            <option value="DIESEL">Diesel</option>
            <option value="GAZ">Gaz</option>
            <option value="BENZIN">Benzin</option>
            <option value="ELECTRICITY">Electricity</option>
          </select>
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

        {/* Success/Error Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Body>{modalMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
};

export default AddCar;
