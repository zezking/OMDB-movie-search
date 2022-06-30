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
import { MovieListProps, SelectType } from "../types";

const List = (props: MovieListProps) => {
  const { results, alert } = props;
  const [selected, setSelected] = useState<SelectType>({
    id: "",
    showInfo: false,
  });

  if (alert.message && alert.type === "app") {
    return (
      <Grid
        spacing={3}
        justifyContent="center"
        container
        className="search-results"
      >
        <Grid item xs={6}>
          <Typography variant="h2">
            Sorry! {alert.message} Please try to search for something else!
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      spacing={3}
      justifyContent="center"
      container
      className="search-results"
    >
      {results.map((movie) => (
        <Grid item key={movie.imdbID} xs={6} md={3}>
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
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "80px",
                marginTop: "10px",
                alignItems: "center",
              }}
            >
              <Typography className="movie-title" variant="h6">
                {movie.Title}
              </Typography>
              <Typography className="movie-title">
                Release Year: {movie.Year}
              </Typography>
              {movie.imdbID === selected.id && selected.showInfo ? (
                <Typography justifyContent="center">
                  IMDB ID: {movie.imdbID}
                </Typography>
              ) : (
                ""
              )}
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
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default List;
