import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import { deleteBook, getBooks } from '../services/BookService';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then((res) => setBooks(res.data));
  }, []);

  const handleDelete = async (id) => {
    await deleteBook(id);
    setBooks(books.filter((book) => book._id !== id));
  };

  return (
    <>
     <Navbar />
    <div className="client-list-container">
      <h1 className="text-center">books List</h1>
      <Link to="/clients/add" className="add-client-button">
        Add Book
      </Link>
      <ul className="client-list">
        {books.map((book) => (
          <li key={book._id} className="client-item">
            <span className="client-info">{book.titre} {book.description} ({book.auteur})</span>
            <div className="button-group">
              <Link to={`/books/edit/${book._id}`} className="edit-button">
                Edit
              </Link>
              <button onClick={() => handleDelete(book._id)} className="delete-button">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default BookList;
