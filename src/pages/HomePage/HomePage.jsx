import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendMovies } from "../../movies-api";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getTrendMovies() {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchTrendMovies();
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getTrendMovies();
  }, []);

  return (
    <div className={css.div}>
      <h2 className={css.h2}>Trending today</h2>
      {loading && <b>Please wait, movies are loading...</b>}
      {movies.length > 0 && <MovieList movies={movies} />}
      {error && <b>Please try again!</b>}
    </div>
  );
}
