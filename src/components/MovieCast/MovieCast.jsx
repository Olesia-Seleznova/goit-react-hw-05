import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";
import { fetchCast } from "../../movies-api";

export default function MovieCast() {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function getMovieCast() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchCast(movieId);
        setCast(data.slice(0, 5));
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovieCast();
  }, [movieId]);

  return (
    <div>
      {loading && <b>Please wait, movies are loading...</b>}
      {error && <b>Please try again!</b>}
      <ul className={css.ul}>
        {cast &&
          cast.map(({ id, name, character, profile_path }) => (
            <li key={id} className={css.li}>
              <img
                className={css.img}
                src={`https://image.tmdb.org/t/p/w300/${profile_path}`}
                alt={name}
              />
              <h3 className={css.h3}>{name}</h3>
              {character && (
                <p className={css.p}>{`Character: ${character}`}</p>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
