// import css from "./MoviesPage.module.css"
import { useEffect, useState } from "react";
import { fetchSearchMovie } from "../../movies-api";
import MovieList from "../../Components/MovieList/MovieList";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    async function getSearchMovie(query) {
      try {
        setError(false);
        setloading(true);
        setMovies([]);
        const data = await fetchSearchMovie(query);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setloading(false);
      }
    }
    getSearchMovie();
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" />
        <button type="submit">Search</button>
      </form>

      {loading && <b>Please wait, movies are loading...</b>}
      {movies.length > 0 && <MovieList movies={movies} />}
      {error && <b>Please try again!</b>}
    </div>
  );
}
