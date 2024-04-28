import css from "./MoviesPage.module.css";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSearchMovie } from "../../movies-api";
import MovieList from "../../Components/MovieList/MovieList";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("query") ?? "";

  const handleSubmit = (e) => {
    e.preventDefault();
    changeMovieFilters(query);
  };

  const changeMovieFilters = (newQuery) => {
    searchParams.set("query", newQuery);
    setSearchParams(searchParams);
    setQuery(newQuery);
  };

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.original_title.toLowerCase().includes(query.toLowerCase())
    );
  }, [movies, query]);

  useEffect(() => {
    if (searchParam === "") {
      return;
    }

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
    getSearchMovie(searchParam);
  }, [searchParam]);

  return (
    <div className={css.div}>
      {loading && (
        <b className={css.message}>Please wait, movies are loading...</b>
      )}
      {error && <b className={css.message}>Please try again!</b>}

      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>

      {movies.length > 0 ? (
        <MovieList movies={filteredMovies} className={css.movies} />
      ) : (
        <p className={css.p}> Any movie found by your request</p>
      )}
    </div>
  );
}
