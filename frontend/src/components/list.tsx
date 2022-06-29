import { useState } from "react";

interface MovieListProps {
  results: { Title: string; Poster: string; imdbID: string }[];
  error: string;
}

const List = (props: MovieListProps) => {
  const { results, error } = props;
  const [showInfo, setShowInfo] = useState(false);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="search-results">
      {results.map((movie) => (
        <div className="image-container" key={movie.imdbID}>
          {movie.Poster === "N/A" ? (
            <img src={"/default_poster.jpg"} alt="default-poster"></img>
          ) : (
            <img src={movie.Poster} alt="movie-poster"></img>
          )}
          <h3 className="movie-title">{movie.Title}</h3>
          <button onClick={() => setShowInfo((prevState) => !prevState)}>
            More info
          </button>
          {showInfo && <div>{movie.imdbID}</div>}
        </div>
      ))}
    </div>
  );
};

export default List;
