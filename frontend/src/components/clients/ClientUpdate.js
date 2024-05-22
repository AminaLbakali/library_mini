import React, { useEffect, useState } from 'react'
import { getClient, updateClient } from '../services/ClientService';
import { useNavigate, useParams } from 'react-router-dom';

export default function ClientUpdate() {
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
    <form onSubmit={handleUpdateSubmit}>
            <input type="text" name="nom" value={client.nom} onChange={handleChange} placeholder="Nom" required />
            <input type="text" name="prenom" value={client.prenom} onChange={handleChange} placeholder="Prenom" required />
            <input type="email" name="email" value={client.email} onChange={handleChange} placeholder="Email" required />
            <button type="submit">{ 'Update'} Client</button>
        </form>
  )
}
