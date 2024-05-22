import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import { addBook, getBook, updateBook } from '../services/BookService';

const BookAdd = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({  image:'' ,titre: '', description: '', auteur: '' });

    useEffect(() => {
        if (id) {
            getBook(id)
                .then((res) => setBook(res.data[0]))
                .catch(error => console.error('Error fetching client:', error));
        }
    }, [id]);
      const [image, setImage] = useState(null);
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
      };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            await addBook(book);
            navigate('/books');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateBook(id, book);
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
            <form onSubmit={id ? handleUpdateSubmit : handleAddSubmit} className="client-form">
            <input type="file" onChange={handleImageChange} />
            {image && <img src={URL.createObjectURL(image)} alt="Uploaded" />}
                <input
                    type="text"
                    name="titre"
                    value={book.titre}
                    onChange={handleChange}
                    placeholder="titre"
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    name="description"
                    value={book.description}
                    onChange={handleChange}
                    placeholder="description"
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    name="auteur"
                    value={book.auteur}
                    onChange={handleChange}
                    placeholder="auteur"
                    required
                    className="form-input"
                />
                <button type="submit" className="form-button">
                    {id ? 'Update' : 'Add'} Client
                </button>
            </form>
        </div>
        </>
    );
};

export default BookAdd;

