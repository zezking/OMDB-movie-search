import React from "react";

interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = (props: SearchProps) => {
  const { search, setSearch } = props;

  return (
    <div className="search-bar">
      <h1>Movie DB</h1>
      <input
        className="search-input"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="type to start movie search"
      ></input>
    </div>
  );
};

export default SearchBar;
