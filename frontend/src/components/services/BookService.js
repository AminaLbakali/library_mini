import axios from 'axios';

const apiUrl = 'http://localhost:3003/livre';

export const getBooks = async () => {
    try {
        return await axios.get(apiUrl);
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

export const getBook = async (id) => {
    try {
        return await axios.get(`${apiUrl}/${id}`);
    } catch (error) {
        console.error('Error fetching book:', error);
        throw error;
    }
};

export const addBook = async (book) => {
    try {
        console.log(apiUrl)
        return await axios.post(apiUrl, book);
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
};

export const updateBook = async (id, book) => {
    try {
        return await axios.put(`${apiUrl}/${id}`, book);
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
};

export const deleteBook = async (id) => {
    try {
        return await axios.delete(`${apiUrl}/${id}`);
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
};
