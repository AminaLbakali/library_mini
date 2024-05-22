import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientList from './components/clients/ClientList';
import ClientForm from './components/clients/ClientForm';
import ClientUpdate from './components/clients/ClientUpdate';
import BookEdit from './components/Books/BookEdit';
import BookAdd from './components/Books/BookAdd';
import BookList from './components/Books/Booklist';
import AddEmprunt from './components/Emprunts/AddEmprunt';
import EmpruntList from './components/Emprunts/EmpruntList';
import Home from './components/layout/home';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<ClientList />} />
                <Route path="/clients/add" element={<ClientForm />} />
                <Route path="/clients/edit/:id" element={<ClientUpdate />} />
                <Route path="/clients/edit/:id" element={<ClientForm />} />
                <Route path="books/add" element={<BookAdd />} />
                <Route path ="/books" element={<BookList/>} />
                <Route path='/books/edit/:id' element={<BookEdit />} />
                <Route path="/emprunts" element={<EmpruntList />} />  
                <Route path="/emprunts/add" element={<AddEmprunt />} />  
            </Routes>
           

        </Router>
    );
}

export default App;