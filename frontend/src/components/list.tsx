import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface MovieListProps {
  results: { Title: string; Poster: string; imdbID: string; Year: string }[];
}

const List = (props: MovieListProps) => {
  const { results } = props;
  const [selected, setSelected] = useState({ id: "", showInfo: false });

  return (
    <Grid
      spacing={3}
      justifyContent="center"
      container
      className="search-results"
    >
      {results.map((movie) => (
        <Grid item key={movie.imdbID} xs={3}>
          <Card
            className="image-container"
            key={movie.imdbID}
            sx={{ height: "100%", margin: "auto" }}
          >
            <div style={{ width: "300px", height: "500px", margin: "0 auto" }}>
              {movie.Poster === "N/A" ? (
                <CardMedia
                  component="img"
                  height="100%"
                  width="100%"
                  image={"/default_poster.jpg"}
                  alt="default-poster"
                ></CardMedia>
              ) : (
                <CardMedia
                  component="img"
                  height="100%"
                  width="100%"
                  image={movie.Poster}
                  alt="movie-poster"
                ></CardMedia>
              )}
            </div>
            <CardContent>
              <Typography className="movie-title" variant="h6">
                {movie.Title}
              </Typography>
              <Typography className="movie-title">
                Release Year: {movie.Year}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={() =>
                  setSelected((prevState) => ({
                    ...prevState,
                    id: movie.imdbID,
                    showInfo: !prevState.showInfo,
                  }))
                }
              >
                More info
              </Button>
              {movie.imdbID === selected.id && selected.showInfo ? (
                <Typography>IMDB ID: {movie.imdbID}</Typography>
              ) : (
                ""
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default List;
