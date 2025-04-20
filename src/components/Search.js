import React from 'react';

const Search = ({ search, setSearch }) => {
  return (
    <header>
      <h2 className="header__title">Find a property that suits your needs</h2>
      <input
        type="text"
        className="header__search"
        placeholder="Enter an address, city, or ZIP code"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </header>
  );
};

export default Search;