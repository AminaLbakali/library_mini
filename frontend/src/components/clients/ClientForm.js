import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addClient, getClient, updateClient } from '../services/ClientService';

const ClientForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState({ nom: '', prenom: '', email: '' });

    useEffect(() => {
        if (id) {
            getClient(id).then((res) => setClient(res.data[0])).catch(error => console.error('Error fetching client:', error));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
                await addClient(client);
            navigate('/');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
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
        <div>
        
        <form onSubmit={handleAddSubmit}>
            <input type="text" name="nom" onChange={handleChange} placeholder="Nom" required />
            <input type="text" name="prenom"  onChange={handleChange} placeholder="Prenom" required />
            <input type="email" name="email"  onChange={handleChange} placeholder="Email" required />
            <button type="submit">{'Add'} Client</button>
        </form>
        </div>
    );
};

export default ClientForm;
