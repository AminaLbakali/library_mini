import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getClients, deleteClient } from '../services/ClientService';
import './ClientList.css';
import Navbar from '../layout/Navbar';

const ClientList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients().then((res) => setClients(res.data));
  }, []);

  const handleDelete = async (id) => {
    await deleteClient(id);
    setClients(clients.filter((client) => client._id !== id));
  };

  return (
    <>
     <Navbar />
    <div className="client-list-container">
      <h1 className="text-center">Client List</h1>
      <Link to="/clients/add" className="add-client-button">
        Add Client
      </Link>
      <ul className="client-list">
        {clients.map((client) => (
          <li key={client._id} className="client-item">
            <span className="client-info">{client.nom} {client.prenom} ({client.email})</span>
            <div className="button-group">
              <Link to={`/clients/edit/${client._id}`} className="edit-button">
                Edit
              </Link>
              <button onClick={() => handleDelete(client._id)} className="delete-button">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default ClientList;
