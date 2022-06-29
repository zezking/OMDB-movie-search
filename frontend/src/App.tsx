import { useEffect, useState } from "react";
import "./App.css";
import List from "./components/list";
import SearchBar from "./components/searchBar";
import axios from "axios";
import { useDebounce } from "./hooks/useDebounce";

export interface SearchType {
  title: string;
  year: string;
  type: string;
  plot: string;
}

const App = () => {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState<SearchType>({
    title: "",
    year: "",
    type: "",
    plot: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  const { title, year, type, plot } = debouncedSearch;

  const getMovies = async ({
    title,
    year,
    type,
    plot,
  }: SearchType): Promise<void> => {
    setLoading(true);
    let baseUrl = `http://www.omdbapi.com/?`;
    if (title) {
      baseUrl += `&s=${title.trim()}`;
    }
    if (year) {
      baseUrl += `&y=${year.trim()}`;
    }
    if (type) {
      baseUrl += `&type=${type.trim()}`;
    }
    if (plot) {
      baseUrl += `&plot=${plot.trim()}`;
    }

    baseUrl += "&apiKey=4dff90e1";

    const results = await axios.get(baseUrl);

    if (results.data.Response === "True") {
      setError("");
      setResults(results.data.Search);
    } else if (results.data.Response === "False") {
      setError(results.data.Error);
    }
  };

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 600);
    if (title || year || type || plot) {
      getMovies({ title, year, type, plot });
    } else {
      setError("");
      setResults([]);
    }

    return () => {
      clearTimeout(loadingTimer);
    };
  }, [title, year, plot, type]);

  return (
    <div className="app">
      <SearchBar search={search} setSearch={setSearch} />
      <h2>Movies</h2>
      <h3>Welcome to movie database!</h3>

      {loading ? (
        <div>Searching...</div>
      ) : (
        <List results={results} error={error} />
      )}
    </div>
  );
};

export default App;
