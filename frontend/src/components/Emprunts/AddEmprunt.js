import React, { useState } from 'react';
import { addNewEmprunt } from '../services/EmpruntService';

const AddEmprunt = () => {
    const [client, setClient] = useState('');
    const [livre, setLivre] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const empruntData = { client, livre };
            await addNewEmprunt(empruntData);
            alert('Emprunt added successfully');
        } catch (error) {
            console.error('Error adding emprunt', error);
            alert('Failed to add emprunt');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Client:</label>
                <input type="text" value={client} onChange={(e) => setClient(e.target.value)} required />
            </div>
            <div>
                <label>Book:</label>
                <input type="text" value={livre} onChange={(e) => setLivre(e.target.value)} required />
            </div>
            <button type="submit">Add Emprunt</button>
        </form>
    );
};

export default AddEmprunt;
