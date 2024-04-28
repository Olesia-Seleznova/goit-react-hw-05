import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <div>
      <ul className={css.ul}>
        {movies.map((movie) => {
          return (
            <li key={movie.id} className={css.li}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.original_title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
