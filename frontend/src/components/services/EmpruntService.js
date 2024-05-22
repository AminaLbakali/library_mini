import axios from 'axios';

const API_URL = 'http://localhost:3002/emprunt'; 

const getAllEmprunts = async () => {
  try {
    const response = await axios.get(`${API_URL}/Allemprunt`);
    return response.data;
  } catch (error) {
    console.error('Error fetching emprunts', error);
    throw error;
  }
};

const getEmpruntByClientId = async (clientId) => {
  try {
    const response = await axios.get(`${API_URL}/Allemprunt/${clientId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching emprunts for client', error);
    throw error;
  }
};

const addNewEmprunt = async (empruntData) => {
  try {
    const response = await axios.post(`${API_URL}/`, empruntData);
    return response.data;
  } catch (error) {
    console.error('Error adding new emprunt', error);
    throw error;
  }
};

export { getAllEmprunts, getEmpruntByClientId, addNewEmprunt };
