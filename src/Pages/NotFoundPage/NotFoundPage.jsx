import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.div}>
      <p className={css.p}>Opps! Page not found! </p>
      <p className={css.p}>
        Please visit out <Link to="/">Home</Link>
      </p>
    </div>
  );
}
