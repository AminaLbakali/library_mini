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
        <div className="p-6 bg-gradient-to-b from-yellow-100 via-red-100 to-yellow-50 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-extrabold mb-8 text-brown-800">Library Borrow List</h1>
            <ul className="space-y-6 w-full max-w-3xl">
                {emprunts.map((emprunt) => (
                    <li key={emprunt.id} className="p-6 bg-white shadow-lg rounded-lg border-l-4 border-yellow-500 hover:bg-yellow-50 transition duration-300">
                        <div className="text-xl font-semibold text-brown-700">
                            {emprunt.client.nom} borrowed:
                        </div>
                        <div className="text-lg text-brown-900 italic">
                            "{emprunt.livre.titre}"
                        </div>
                        <div className="text-sm text-brown-600 mt-2">
                            on {new Date(emprunt.date_emprunt).toLocaleDateString()}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmpruntList;

