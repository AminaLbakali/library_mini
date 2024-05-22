import React from 'react';
import './Home.css'; // Importing CSS for styling

const home = () => {
  return (
    <div className="container">
      <h1>Welcome to My Library</h1>
      <p>Your one-stop destination for all your reading needs.</p>
      <p>At My Library, we are passionate about bringing the joy of reading to everyone. Our mission is to provide access to a wide range of books and resources, fostering a love for literature and lifelong learning.</p>
      <h2>Featured Books</h2>
      <div className="featured-books">
        <div className="book">
          <img src="book1.jpg" alt="Book 1" />
          <h3>Book Title 1</h3>
          <p>A captivating story that will keep you hooked till the last page.</p>
        </div>
        <div className="book">
          <img src="book2.jpg" alt="Book 2" />
          <h3>Book Title 2</h3>
          <p>An inspiring journey of self-discovery and adventure.</p>
        </div>
        <div className="book">
          <img src="book3.jpg" alt="Book 3" />
          <h3>Book Title 3</h3>
          <p>Explore the mysteries of the universe in this fascinating read.</p>
        </div>
      </div>
      <a href="/books" className="explore-btn">Explore More Books</a>
    </div>
  );
};

export default home;
