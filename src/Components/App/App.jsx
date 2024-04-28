// import css from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../Pages/HomePage/HomePage";
import MoviesPage from "../../Pages/MoviesPage/MoviesPage";
import Navigation from "../Navigation/Navigation";
import NotFoundPage from "../../Pages/NotFoundPage/NotFoundPage";
import MovieDetailsPage from "../../Pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "../MovieCast/MovieCast";
import MovieReviews from "../MovieReviews/MovieReviews";

export default function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
