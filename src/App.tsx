import { useEffect, useState } from "react";
import List from "./components/List";
import SearchBar from "./components/SearchBar";
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
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import { AlertType, SearchType } from "./types";

const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const App = () => {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState<SearchType>({
    title: "Matrix",
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

  const handleSnackBarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert((prevState) => ({ ...prevState, open: false }));
  };

  const handleBackDropClose = () => {
    setOpenBackdrop(false);
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

    baseUrl += `&apiKey=${OMDB_API_KEY}`;

    if ((type || year) && !title) {
      setAlert((prevState) => ({
        ...prevState,
        type: "request",
        open: true,
        message: "Please enter title before search by year or type",
      }));
      return;
    }

    const results = await axios.get(baseUrl);
    setOpenBackdrop(true);

    if (results.data.Response === "True") {
      setAlert((prevState) => ({
        ...prevState,
        type: "",
        open: false,
        message: "",
      }));
      setResults(results.data.Search);
    } else if (results.data.Response === "False") {
      setAlert((prevState) => ({
        ...prevState,
        type: "app",
        open: true,
        message: results.data.Error,
      }));
      setResults([]);
    }
  };

  useEffect(() => {
    const loadingTimer = setTimeout(handleBackDropClose, 500);

    if (title || year || type) {
      getMovies({ title, year, type });
    } else {
      setResults([]);
      setAlert((prevState) => ({ ...prevState, open: false, message: "" }));
    }

    return () => {
      clearTimeout(loadingTimer);
    };
  }, [title, year, type]);

  return (
    <ThemeProvider theme={theme}>
      <TopBar />
      <div
        className="app"
        style={{
          marginTop: "200px",
          maxWidth: "1440px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "0 20px",
        }}
      >
        <Header />
        <SearchBar search={search} setSearch={setSearch} />
        <List results={results} alert={alert} />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
          onClick={handleBackDropClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Stack sx={{ width: "100%" }}>
          <Snackbar
            open={alert.open && alert.type === "request"}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            autoHideDuration={7000}
            onClose={handleSnackBarClose}
          >
            <Alert severity="error" onClose={handleSnackBarClose}>
              {alert.message}
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    </ThemeProvider>
  );
};

export default App;
