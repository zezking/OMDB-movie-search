import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React from "react";
import { SearchProps } from "../types";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = (props: SearchProps) => {
  const { search, setSearch } = props;

  const handleTitleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  };

  const handleYearInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch((prevState) => ({
      ...prevState,
      year: event.target.value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setSearch((prevState) => ({
      ...prevState,
      type: event.target.value,
    }));
  };

  return (
    <Grid
      container
      spacing={3}
      display="flex"
      flexDirection="row"
      justifyContent="center"
      marginY={5}
    >
      <Grid item xs={12} sm={4} md={7}>
        <TextField
          label="Search by title"
          fullWidth
          className="search-input"
          onChange={handleTitleInput}
          InputProps={{
            defaultValue: "Matrix",
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "black" }} />
              </InputAdornment>
            ),
          }}
          placeholder="You can enter some of your favorite movies titles, e.g Matrix"
        />
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <TextField
          label="Search by year"
          fullWidth
          className="search-input"
          value={search.year}
          onChange={handleYearInput}
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
      <Grid item xs={12} sm={4} md={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            value={search.type}
            label="Type"
            onChange={handleSelectChange}
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
