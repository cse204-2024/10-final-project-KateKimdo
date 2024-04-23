// SearchHistory.js
import React from "react";

const SearchHistory = ({ history, onDelete }) => {
  return (
    <ul>
      {history.map((item, index) => (
        <li key={index}>
          {item}
          <button onClick={() => onDelete(index)}>X</button>
        </li>
      ))}
    </ul>
  );
};

export default SearchHistory;