import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getClients, deleteClient } from '../services/ClientService';
import './ClientList.css';
import Navbar from '../layout/Navbar';
import { FaUser, FaEdit } from 'react-icons/fa';


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
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <FaUser style={{ marginRight: '15px' }} /> 
        Add Client
      </span>
    </Link>
      
    <ul role="list" className="divide-y divide-gray-100">
  {clients.map((client) => (
    <li key={client._id} className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{client.nom} {client.prenom}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{client.email}</p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <Link to={`/clients/edit/${client._id}`} className="text-sm leading-6 text-gray-900">Edit</Link>
        <button onClick={() => handleDelete(client._id)} className="mt-1 text-xs leading-5 text-gray-500 hover:text-red-500">Delete</button>
      </div>
    </li>
  ))}
</ul>
    </div>
    </>
  );
};

export default ClientList;
