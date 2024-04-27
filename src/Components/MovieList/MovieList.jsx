import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  return (
    <div>
      <ul className={css.ul}>
        {movies.map((movie) => {
          return (
            <li key={movie.id} className={css.li}>
              <Link to={`/movies/${movie.id}`}>{movie.original_title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
