import React, { useEffect, useState } from 'react';
import { addNewEmprunt } from '../services/EmpruntService';
import { getClients } from '../services/ClientService';
import { getBooks } from '../services/BookService';




const AddEmprunt = () => {
    const [clients, setClients] = useState([]);
    const [livres, setLivres] = useState([]);
    const [idClient ,setidClient]= useState('');
    const [idBook ,setidBook]= useState('');

    useEffect (()=>{
        getClients().then((res) => setClients(res.data));
        getBooks().then((res) => setLivres(res.data));
    },[])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const empruntData = { id:idClient ,code:idBook };
            console.log(empruntData)
            await addNewEmprunt(empruntData);
            alert('Emprunt added successfully');
        } catch (error) {
            console.error('Error adding emprunt', error);
            alert('Failed to add emprunt');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Client:
                <select value={idClient} onChange={(e) => setidClient(e.target.value)}>
                    <option value="">Select a client</option>
                    {clients.map((client) => (
                        <option key={client.id} value={client._id}>
                            {client.nom}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Livre:
                <select value={idBook} onChange={(e) => setidBook(e.target.value)}>
                    <option value="">Select a livre</option>
                    {livres.map((livre) => (
                        <option key={livre.id} value={livre._id}>
                            {livre.titre}
                        </option>
                    ))}
                </select>
            </label>
            <button type="submit">Add Emprunt</button>
        </form>
    );
};

export default AddEmprunt;
