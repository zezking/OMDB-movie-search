import React from "react";
import { SearchType } from "../App";

interface SearchProps {
  search: SearchType;
  setSearch: React.Dispatch<React.SetStateAction<SearchType>>;
}

const SearchBar = (props: SearchProps) => {
  const { search, setSearch } = props;

  return (
    <div className="search-bar">
      <h1>Movie DB</h1>
      <input
        className="search-input"
        value={search.title}
        onChange={(event) =>
          setSearch((prevState) => ({
            ...prevState,
            title: event.target.value,
          }))
        }
        placeholder="search by title..."
      ></input>
      <input
        className="search-input"
        value={search.year}
        onChange={(event) =>
          setSearch((prevState) => ({ ...prevState, year: event.target.value }))
        }
        placeholder="search by year..."
      ></input>
      <input
        className="search-input"
        value={search.type}
        onChange={(event) =>
          setSearch((prevState) => ({ ...prevState, type: event.target.value }))
        }
        placeholder="search by type..."
      ></input>
      <input
        className="search-input"
        value={search.plot}
        onChange={(event) =>
          setSearch((prevState) => ({ ...prevState, plot: event.target.value }))
        }
        placeholder="search by plot..."
      ></input>
    </div>
  );
};

export default SearchBar;
