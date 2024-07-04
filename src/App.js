import React, { useState } from 'react';
import { Amplify } from 'aws-amplify'; // Import API from aws-amplify
import './App.css';

function App() {
  const [formData, setFormData] = useState({ email: '', message: '', phone: '' });

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Amplify.API.post('codingXpertsApi', '/contact', { body: formData }); // Replace 'codingXpertsApi' with your API name
      alert('Message sent successfully');
      setFormData({ email: '', message: '', phone: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message');
    }
  };

  return (
    <div className="App">
      <h1>Coming Soon: Coding Xperts</h1>
      <p>We're working hard to bring you the best IT solutions. Stay tuned!</p>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Message:
          <textarea name="message" value={formData.message} onChange={handleChange} required />
        </label>
        <label>
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <button type="submit">Contact Us</button>
      </form>
    </div>
  );
}

export default App;
