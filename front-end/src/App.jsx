// src/App.jsx
import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/recipes'); // Substitua pela URL da sua API
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dados da API:</h1>
      <ul>
        {data.map((item) => (
          <li key={item.title}>
            <strong>Título:</strong> {item.title}
            <br />
            <strong>Descrição:</strong> {item.description}
          </li>
        ))}
        </ul>
    </div>
  );
};

export default App;
