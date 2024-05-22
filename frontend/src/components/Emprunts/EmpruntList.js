import React, { useState, useEffect } from 'react';
import { getAllEmprunts } from '../services/EmpruntService';

const EmpruntList = () => {
    const [emprunts, setEmprunts] = useState([]);

    useEffect(() => {
        const fetchEmprunts = async () => {
            try {
                const data = await getAllEmprunts();
                setEmprunts(data);
            } catch (error) {
                console.error('Error fetching emprunts', error);
            }
        };

        fetchEmprunts();
    }, []);

    return (
        <div>
            <h1>List of Emprunts</h1>
            <ul>
                {emprunts.map((emprunt) => (
                    <li key={emprunt.id}>
                        {emprunt.client.nom} borrowed {emprunt.livre.titre} on {new Date(emprunt.date_emprunt).toLocaleDateString()}

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmpruntList;
