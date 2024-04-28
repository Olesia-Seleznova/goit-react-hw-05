import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import css from "./Moviereviews.module.css";
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
    <div>
      {loading && <b>Loading reviews...</b>}
      {error && <b>Error fetching reviews!</b>}
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </div>
        ))
      ) : (
        <p>No reviews available for this movie.</p>
      )}
    </div>
  );
}
