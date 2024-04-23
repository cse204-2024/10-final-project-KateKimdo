// SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (input.trim()) {
      onSearch(input);
      setInput(''); // Clear the input after search
    }
  };

  return (
    <form onSubmit={handleSearch}> {/* Use a form to handle enter key submission */}
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter food name"
      />
      <button type="submit">Search</button> {/* Button to trigger form submission */}
    </form>
  );
};

export default SearchBar;