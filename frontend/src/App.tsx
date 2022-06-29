import { useEffect, useState } from "react";
import "./App.css";
import List from "./components/list";
import SearchBar from "./components/searchBar";
import axios from "axios";
import { useDebounce } from "./hooks/useDebounce";

const App = () => {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  const getMovies = async (title: string) => {
    const url = `http://www.omdbapi.com/?s=${title}&apikey=4dff90e1`;
    const results = await axios.get(url);
    if (results.data.Response === "True") {
      setResults(results.data.Search);
    } else {
      setResults(results.data.Error);
    }
    setIsSearching(false);
  };

  useEffect(() => {
    if (debouncedSearch) {
      setIsSearching(true);
      getMovies(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <div className="app">
      <SearchBar search={search} setSearch={setSearch} />
      <h2>Movies</h2>
      {isSearching && <div>Searching ...</div>}

      {search ? (
        <List results={results} />
      ) : (
        <div>Want to learn more about a movie? Let's start typing</div>
      )}
    </div>
  );
};

export default App;
