import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchDetailsMovie } from "../../movies-api";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [dataMovie, setDataMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getDetailsMovie() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchDetailsMovie(movieId);
        setDataMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getDetailsMovie();
  }, [movieId]);

  return (
    <div className={css.div}>
      <Link to="/">← Go back</Link>
      {dataMovie && (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${dataMovie.backdrop_path}`}
            alt={dataMovie.title}
          />

          <div>
            <h2>
              {dataMovie.title} ({dataMovie.release_date.slice(0, 4)})
            </h2>
            <p>User Score: {dataMovie.vote_average}</p>
            <h3>Overview</h3>
            <p>{dataMovie.overview}</p>
            <h3>Genres</h3>
            <p>{dataMovie.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
        </div>
      )}
      {loading && <b>Please wait, movies are loading...</b>}
      {error && <b>Please try again!</b>}
    </div>
  );
}
