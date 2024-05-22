import React, { useEffect, useState } from "react";
import { addNewEmprunt } from "../services/EmpruntService";
import { getClients } from "../services/ClientService";
import { getBooks } from "../services/BookService";
import './AddEmprunt.css'
const AddEmprunt = () => {
  const [clients, setClients] = useState([]);
  const [livres, setLivres] = useState([]);
  const [idClient, setidClient] = useState("");
  const [idBook, setidBook] = useState("");

  useEffect(() => {
    getClients().then((res) => setClients(res.data));
    getBooks().then((res) => setLivres(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const empruntData = { id: idClient, code: idBook };
      console.log(empruntData);
      await addNewEmprunt(empruntData);
      alert("Emprunt added successfully");
    } catch (error) {
      console.error("Error adding emprunt", error);
      alert("Failed to add emprunt");
    }
  };
  return (
    <div className="container">
    <h1 className="title">Add Emprunt</h1>
    <form onSubmit={handleSubmit} className="form">
      <label className="label">
        <span>Client:</span>
        <select
          value={idClient}
          onChange={(e) => setidClient(e.target.value)}
          className="select"
        >
          <option value="">Select a client</option>
          {clients.map((client) => (
            <option key={client.id} value={client._id}>
              {client.nom}
            </option>
          ))}
        </select>
      </label>
      <label className="label">
        <span>Livre:</span>
        <select
          value={idBook}
          onChange={(e) => setidBook(e.target.value)}
          className="select"
        >
          <option value="">Select a livre</option>
          {livres.map((livre) => (
            <option key={livre.id} value={livre._id}>
              {livre.titre}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="button">
        Add Emprunt
      </button>
    </form>
  </div>
  );
};

export default AddEmprunt;
