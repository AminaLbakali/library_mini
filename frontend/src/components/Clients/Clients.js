import React, { useEffect, useState } from 'react'
import Axios from 'axios';

export default function Clients() {
  const [clients , setclients]= useState([]);

  useEffect(()=>{
    const fetchClients = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/client');
        setclients(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchClients();
  },[])
  return (
    <div>
      {clients && clients.map((c)=>
        <p>{c?.nom}</p>
      )}
    </div>
  )
}
