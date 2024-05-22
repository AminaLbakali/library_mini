
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientList from './components/clients/ClientList';
import ClientForm from './components/clients/ClientForm';

import ClientUpdate from './components/clients/ClientUpdate';
import Books from './components/Books/BookAdd';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ClientList />} />
                <Route path="/clients/add" element={<ClientForm />} />
                <Route path="/clients/edit/:id" element={<ClientUpdate />} />
                <Route path="/clients/edit/:id" element={<ClientForm />} />
                <Route path ="/books" element={<Books/>} />
            </Routes>
           

        </Router>
    );
}

export default App;