import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import logo from './logo.svg'

const Navbar = () => {
  return (
    <header class="bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <Link to="/">
          <img class="h-10 w-auto" src={logo} alt="Your Company Name" />
          </Link>
        </div>
        <div class="hidden lg:block lg:ml-6">
          <h2 class="text-sm font-semibold leading-6 text-gray-900">library</h2>
        </div>
      </div>
      <div class="hidden lg:block lg:ml-6">
        <div class="flex items-center gap-x-6">
          <Link to="/books" class="text-sm font-semibold leading-6 text-gray-900">Books</Link>
          <Link to="/" class="text-sm font-semibold leading-6 text-gray-900">Clients</Link>
          <Link to="/emprunts" class="text-sm font-semibold leading-6 text-gray-900">Emprunt</Link>
        </div>
      </div>
    </nav>
  </header>
  );
};

export default Navbar;
