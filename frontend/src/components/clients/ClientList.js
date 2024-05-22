import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getClients, deleteClient } from '../services/ClientService';

const ClientList = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        getClients().then((res) => setClients(res.data));
    }, []);

    const handleDelete = async (id) => {
        await deleteClient(id);
        setClients(clients.filter(client => client._id !== id));
    };

    return (
        <div>
            <h1>Client List</h1>
            <Link to="/clients/add">Add Client</Link>
            <ul>
                {clients.map((client) => (
                    <li key={client._id}>
                        {client.nom} {client.prenom} ({client.email})
                        <Link to={`/clients/edit/${client._id}`}>Edit</Link>
                        <button onClick={() => handleDelete(client._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientList;
