
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientList from './components/clients/ClientList';
import ClientForm from './components/clients/ClientForm';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ClientList />} />
                <Route path="/clients/add" element={<ClientForm />} />
                <Route path="/clients/edit/:id" element={<ClientForm />} />
            </Routes>
        </Router>
    );
};
export default App;