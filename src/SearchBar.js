import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSearch}> 
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter food name"
      />
      <button type="submit">Search</button> 
    </form>
  );
};

export default SearchBar;