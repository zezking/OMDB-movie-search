import { useEffect, useState } from "react";
import List from "./components/list";
import SearchBar from "./components/searchBar";
import axios from "axios";
import { useDebounce } from "./hooks/useDebounce";
import { ThemeProvider } from "@emotion/react";
import {
  Alert,
  Backdrop,
  CircularProgress,
  Snackbar,
  Stack,
} from "@mui/material";
import { theme } from "./styles";
import TopBar from "./components/topBar";
import AppTitle from "./components/title";

export interface SearchType {
  title: string;
  year: string;
  type: string;
}

const App = () => {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState<SearchType>({
    title: "",
    year: "",
    type: "",
  });

  const debouncedSearch = useDebounce(search, 700);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [alert, setAlert] = useState({ message: "", open: false });

  const { title, year, type } = debouncedSearch;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert((prevState) => ({ ...prevState, open: false, message: "" }));
  };

  const getMovies = async ({
    title,
    year,
    type,
  }: SearchType): Promise<void> => {
    setOpenBackdrop(true);

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

    baseUrl += "&apiKey=4dff90e1";

    const results = await axios.get(baseUrl);

    if (results.data.Response === "True") {
      setAlert((prevState) => ({ ...prevState, open: false, message: "" }));
      setResults(results.data.Search);
    } else if (results.data.Response === "False") {
      setAlert((prevState) => ({
        ...prevState,
        open: true,
        message: results.data.Error,
      }));
    }
  };

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setOpenBackdrop(false);
    }, 600);
    if (title || year || type) {
      getMovies({ title, year, type });
    } else {
      setAlert((prevState) => ({ ...prevState, open: false, message: "" }));
      setResults([]);
    }

    return () => {
      clearTimeout(loadingTimer);
    };
  }, [title, year, type]);

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <TopBar />
        <AppTitle />
        <SearchBar search={search} setSearch={setSearch} />
        <List results={results} />

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
          onClick={() => setOpenBackdrop(false)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Stack sx={{ width: "100%" }}>
          <Snackbar
            open={alert.open}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert severity="warning" onClose={handleClose}>
              {alert.message}
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    </ThemeProvider>
  );
};

export default App;
