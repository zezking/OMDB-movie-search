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
import Header from "./components/header";
import { AlertType, SearchType } from "./types";

const App = () => {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState<SearchType>({
    title: "",
    year: "",
    type: "",
  });
  const debouncedSearch = useDebounce(search, 500);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertType>({
    type: "",
    message: "",
    open: false,
  });
  const { title, year, type } = debouncedSearch;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert((prevState) => ({ ...prevState, open: false }));
  };

  const getMovies = async ({
    title,
    year,
    type,
  }: SearchType): Promise<void> => {
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

    if (type && !title && !year) {
      setAlert((prevState) => ({
        ...prevState,
        type: "app",
        open: true,
        message: "Please enter title or year before selecting type",
      }));
      return;
    }

    const results = await axios.get(baseUrl);
    setOpenBackdrop(true);

    if (results.data.Response === "True") {
      setAlert((prevState) => ({
        ...prevState,
        type: "request",
        open: false,
        message: "",
      }));
      setResults(results.data.Search);
    } else if (results.data.Response === "False") {
      setAlert((prevState) => ({
        ...prevState,
        type: "request",
        open: true,
        message: results.data.Error,
      }));
      setResults([]);
    }
  };

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setOpenBackdrop(false);
    }, 500);

    if (title || year || type) {
      getMovies({ title, year, type });
    } else {
      setResults([]);
    }

    return () => {
      clearTimeout(loadingTimer);
    };
  }, [title, year, type]);

  return (
    <ThemeProvider theme={theme}>
      <TopBar />
      <div className="app" style={{ marginTop: "200px" }}>
        <Header />
        <SearchBar search={search} setSearch={setSearch} />
        <List results={results} alert={alert} />
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
            <Alert severity="error" onClose={handleClose}>
              {alert.message}
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    </ThemeProvider>
  );
};

export default App;
