import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { SearchType } from "../App";
import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  search: SearchType;
  setSearch: React.Dispatch<React.SetStateAction<SearchType>>;
}

const SearchBar = (props: SearchProps) => {
  const { search, setSearch } = props;

  return (
    <Grid
      container
      spacing={3}
      display="flex"
      flexDirection="row"
      justifyContent="center"
      marginY={5}
    >
      <Grid item xs={5}>
        <TextField
          label="Title"
          fullWidth
          className="search-input"
          value={search.title}
          onChange={(event) =>
            setSearch((prevState) => ({
              ...prevState,
              title: event.target.value,
            }))
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "black" }} />
              </InputAdornment>
            ),
          }}
          placeholder="Enter title..."
        />
      </Grid>
      <Grid item>
        <TextField
          label="Year"
          className="search-input"
          value={search.year}
          onChange={(event) =>
            setSearch((prevState) => ({
              ...prevState,
              year: event.target.value,
            }))
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "black" }} />
              </InputAdornment>
            ),
          }}
          placeholder="Enter year..."
        />
      </Grid>
      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            value={search.type}
            label="Type"
            onChange={(event) =>
              setSearch((prevState) => ({
                ...prevState,
                type: event.target.value,
              }))
            }
          >
            <MenuItem value="movie">movie</MenuItem>
            <MenuItem value="series">series</MenuItem>
            <MenuItem value="episode">episode</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
