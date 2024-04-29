import { useState, useEffect, Suspense, useRef } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { fetchDetailsMovie } from "../../movies-api";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [dataMovie, setDataMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkURLRef = useRef(
    location.state !== null && location.state !== undefined
      ? location.state.from
      : "/movies"
  );

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
      <Link to={backLinkURLRef.current} state={location}>
        ← Go back
      </Link>
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

      <hr />

      <div>
        <h4 className={css.h4}>Additional information</h4>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews ">Reviews</Link>
          </li>
        </ul>

        <Suspense fallback={<p>Please wait loading page...</p>}>
          <Outlet />
        </Suspense>
      </div>

      <hr />

      {loading && <b>Please wait, movies are loading...</b>}
      {error && <b>Please try again!</b>}
    </div>
  );
}
