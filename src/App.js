import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchHistory from './SearchHistory';
import NutritionInfo from './NutritionInfo';
import './App.css'; 

const App = () => {
  const [nutritionData, setNutritionData] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {

    const savedHistory = ['Mango', 'Potato', 'Okra'];
    setHistory(savedHistory);
  }, []);

  const fetchNutritionData = (searchQuery) => {
  setHistory(prevHistory => [...prevHistory, searchQuery]);

  const API_KEY = 'JWcDfJ3CzYhTRd16vclKlnJhG1VhOK1LvHvwMvMw';
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setNutritionData(data.foods[0]);
      setError('');
    })
    .catch(error => {
      console.error("Error fetching nutrition data:", error);
      setError('Failed to fetch nutrition data');
      setNutritionData(null);
    });
};

  const handleDeleteHistoryItem = (index) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
 
  };

  return (
    <div className="App">
      <h1>Nutrition Information System</h1>
      <div className="SearchBar">
        <SearchBar onSearch={fetchNutritionData} />
      </div>
      <div className="SearchHistory">
        <SearchHistory history={history} onDelete={handleDeleteHistoryItem} />
      </div>
      <div className="NutritionInfo">
        <NutritionInfo info={nutritionData} />
      </div>
      {error && <p className="ErrorMessage">{error}</p>}
    </div>
  );
};

export default App;