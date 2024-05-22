import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { addClient, getClient, updateClient } from '../services/ClientService';
import Navbar from '../layout/Navbar';
import './ClientForm.css'; 

const ClientForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState({ nom: '', prenom: '', email: '' });

    useEffect(() => {
        if (id) {
            getClient(id)
                .then((res) => setClient(res.data[0]))
                .catch(error => console.error('Error fetching client:', error));
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
        <> <Navbar />
        <div className="form-container">
  <h1 className="form-title">{id ? 'Edit' : 'Add'} Client</h1>
  <form onSubmit={id ? handleUpdateSubmit : handleAddSubmit} className="client-form space-y-12">
    <div className="border-b border-gray-900/10 pb-12">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="nom" className="block text-sm font-medium leading-6 text-gray-900">Nom</label>
          <div className="mt-2">
            <input
              type="text"
              name="nom"
              id="nom"
              value={client.nom}
              onChange={handleChange}
              placeholder="Nom"
              required
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="prenom" className="block text-sm font-medium leading-6 text-gray-900">Prenom</label>
          <div className="mt-2">
            <input
              type="text"
              name="prenom"
              id="prenom"
value={client.prenom}
              onChange={handleChange}
              placeholder="Prenom"
              required
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={client.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
    </div>
    <div className="mt-6 flex items-center justify-end gap-x-6">
      <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">Cancel</Link>
      <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        {id ? 'Update' : 'Add'} Client
      </button>
    </div>
  </form>
</div>
        </>
    );
};

export default ClientForm;

