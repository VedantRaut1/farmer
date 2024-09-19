// src/components/RentalPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Rental.css';

const Rental = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [userEquipment, setUserEquipment] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    availability: ''
  });

  useEffect(() => {
    // Fetch available equipment from the server
    const fetchEquipment = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/equipment');
        setEquipmentList(response.data);
      } catch (err) {
        console.error('Error fetching equipment:', err);
      }
    };

    // Fetch user's own equipment
    const fetchUserEquipment = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/equipment');
        setUserEquipment(response.data);
      } catch (err) {
        console.error('Error fetching user equipment:', err);
      }
    };

    fetchEquipment();
    fetchUserEquipment();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/equipment', formData);
      setFormData({
        name: '',
        description: '',
        price: '',
        availability: ''
      });
      // Refetch equipment to update the list
      const response = await axios.get('http://localhost:5000/api/equipment');
      setEquipmentList(response.data);
    } catch (err) {
      console.error('Error adding equipment:', err);
    }
  };

  return (
    <div className="rental-page">
      <h1>Farming Equipment Rental</h1>

      <section className="equipment-list">
        <h2>Available Equipment</h2>
        <div className="equipment-grid">
          {equipmentList.length > 0 ? (
            equipmentList.map((item) => (
              <div key={item._id} className="equipment-item">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Price: ${item.price} per day</p>
                <p>Availability: {item.availability}</p>
                <button>Request to Rent</button>
              </div>
            ))
          ) : (
            <p>No equipment available at the moment.</p>
          )}
        </div>
      </section>

      <section className="add-equipment">
        <h2>List Your Equipment</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Equipment Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price per day"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="availability"
            placeholder="Availability (e.g., available, not available)"
            value={formData.availability}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Equipment</button>
        </form>
      </section>

      <section className="user-equipment">
        <h2>Your Listed Equipment</h2>
        <div className="equipment-grid">
          {userEquipment.length > 0 ? (
            userEquipment.map((item) => (
              <div key={item._id} className="equipment-item">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Price: ${item.price} per day</p>
                <p>Availability: {item.availability}</p>
              </div>
            ))
          ) : (
            <p>You have not listed any equipment yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Rental;
