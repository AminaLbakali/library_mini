import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import { getBook, updateBook } from '../services/BookService';

export default function BookEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ titre: '',description: '', auteur: '' });

  useEffect(() => {
    if (id) {
      getBook(id)
        .then((res) => setBook(res.data[0]))
        .catch((error) => console.error('Error fetching client:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateBook(id, book);
      }
      navigate('/books');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <h1 className="form-title">Update book</h1>
        <form onSubmit={handleUpdateSubmit} className="client-form">
          <input
            type="text"
            name="titre"
            value={book.titre}
            onChange={handleChange}
            placeholder="Titre"
            required
            className="form-input"
          />
          <input
            type="text"
            name="description"
            value={book.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="form-input"
          />
          <input
            type="text"
            name="auteur"
            value={book.auteur}
            onChange={handleChange}
            placeholder="Auteur"
            required
            className="form-input"
          />
          <button type="submit" className="form-button">Update book</button>
        </form>
      </div>
    </>
  );
}
