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
    <form className="SearchBar" onSubmit={handleSearch}> 
      <input
        className="SearchInput" 
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter food name"
      />
      <button className="SearchButton" type="submit">Search</button> 
    </form>
  );
};

export default SearchBar;
