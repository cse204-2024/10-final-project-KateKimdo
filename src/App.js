import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchHistory from './SearchHistory';
import NutritionInfo from './NutritionInfo';
import RandomFoodButton from './RandomFoodButton';
import './App.css';

const App = () => {
  const [nutritionData, setNutritionData] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const sampleFoods = ["Apple", "Banana", "Carrot", "Date", "Eggplant", "Fig", "Grape", "Honeydew"];

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(savedHistory);
  }, []);

  const fetchNutritionData = (searchQuery) => {
    setLoading(true);
    setHistory(prevHistory => [searchQuery, ...prevHistory]);
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
        if (data.foods && data.foods.length > 0) {
          setNutritionData(data.foods[0]);
          setError('');
        } else {
          throw new Error('No nutrition information found for this item');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching nutrition data:", error);
        setError(error.message);
        setNutritionData(null);
        setLoading(false);
      });
  };

  const fetchRandomFood = () => {
    const randomIndex = Math.floor(Math.random() * sampleFoods.length);
    const randomFood = sampleFoods[randomIndex];
    fetchNutritionData(randomFood);
  };

  const handleDeleteHistoryItem = (index) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
    if (index === 0) {
      setNutritionData(null);
    }
  };

  return (
    <div className="App">
      <div className="main-content">
      <p className="api-explanation">Enter a food item or click on the random food button to explore nutrition information.</p>
        <div className="search-wrapper">
          <div className="search-and-button">
                <SearchBar onSearch={fetchNutritionData} />
                <RandomFoodButton fetchRandomFood={fetchRandomFood} />
          </div>
          <div className="SearchHistory">
            <SearchHistory history={history} onDelete={handleDeleteHistoryItem} />
          </div>
        </div>
        <div className="NutritionInfo">
          {loading && <div className="LoadingMessage">Loading...</div>}
          {!loading && nutritionData && <NutritionInfo info={nutritionData} itemName={history[0]} />}
          {!loading && !nutritionData && error && <div className="ErrorMessage">{error}</div>}
        </div>
      </div>
    </div>
  );
  }  

export default App;
