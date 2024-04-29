import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";
import { fetchReviews } from "../../movies-api";

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function getMovieReviews() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovieReviews();
  }, [movieId]);

  return (
    <div className={css.div}>
      {loading && <b className={css.loading}>Loading reviews...</b>}
      {error && <b className={css.error}>Error fetching reviews!</b>}
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className={css.review}>
            <h3 className={css.h3}>Author: {review.author}</h3>
            <p className={css.p}>{review.content}</p>
          </div>
        ))
      ) : (
        <p className={css.noRevies}>No reviews available for this movie.</p>
      )}
    </div>
  );
}
