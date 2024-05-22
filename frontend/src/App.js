<<<<<<< HEAD
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
=======
import './App.css';
import Books from './components/Books/Books';
import Navbar from './components/partials/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Books />
    </div>
  );
}
>>>>>>> 23e3c098c8f13c117f444a41f6b89b1137ea83b0

export default App;