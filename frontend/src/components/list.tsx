interface MovieListProps {
  results: { Title: string; Poster: string; imdbID: string }[] | string;
}

const List = (props: MovieListProps) => {
  const { results } = props;

  if (typeof results === "string") {
    return <div>{results}</div>;
  }

  return (
    <div className="search-results">
      {results.map((movie) => (
        <div className="image-container" key={movie.imdbID}>
          <img src={movie.Poster} alt="movie-poster"></img>
          <h3 className="movie-title">{movie.Title}</h3>
        </div>
      ))}
    </div>
  );
};

export default List;
