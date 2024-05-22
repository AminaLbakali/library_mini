import axios from 'axios';

const apiUrl = 'http://localhost:3000/client';

export const getClients = async () => {
    try {
        return await axios.get(apiUrl);
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
    }
};

export const getClient = async (id) => {
    try {
        return await axios.get(`${apiUrl}/${id}`);
    } catch (error) {
        console.error('Error fetching client:', error);
        throw error;
    }
};

export const addClient = async (client) => {
    try {
        return await axios.post(apiUrl, client);
    } catch (error) {
        console.error('Error adding client:', error);
        throw error;
    }
};

export const updateClient = async (id, client) => {
    try {
        return await axios.put(`${apiUrl}/${id}`, client);
    } catch (error) {
        console.error('Error updating client:', error);
        throw error;
    }
};

export const deleteClient = async (id) => {
    try {
        return await axios.delete(`${apiUrl}/${id}`);
    } catch (error) {
        console.error('Error deleting client:', error);
        throw error;
    }
};
