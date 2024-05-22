import React, { useEffect, useState } from 'react';
import { getClient, updateClient } from '../services/ClientService';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import './ClientUpdate.css'; 

export default function ClientUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState({ nom: '', prenom: '', email: '' });

  useEffect(() => {
    if (id) {
      getClient(id)
        .then((res) => setClient(res.data[0]))
        .catch((error) => console.error('Error fetching client:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateClient(id, client);
      }
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <h1 className="form-title">Update Client</h1>
        <form onSubmit={handleUpdateSubmit} className="client-form">
          <input
            type="text"
            name="nom"
            value={client.nom}
            onChange={handleChange}
            placeholder="Nom"
            required
            className="form-input"
          />
          <input
            type="text"
            name="prenom"
            value={client.prenom}
            onChange={handleChange}
            placeholder="Prenom"
            required
            className="form-input"
          />
          <input
            type="email"
            name="email"
            value={client.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="form-input"
          />
          <button type="submit" className="form-button">Update Client</button>
        </form>
      </div>
    </>
  );
}
