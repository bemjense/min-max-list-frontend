import React from 'react';
import './TodoPage.css'; // Add styles for the search bar if needed

const SearchBar = ({ searchQuery, onSearch }) => {
    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="search-bar-input"
            />
        </div>
    );
};

export default SearchBar;
