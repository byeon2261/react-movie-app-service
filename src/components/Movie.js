import propType from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";

function Movie({ id, coverImg, title, year, summary, genres }) {
  return (
    <div className={styles.movie}>
      <img src={coverImg} alt={title} className={styles.movie__img} />
      <div>
        <h2 className={styles.movie__title}>
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <h3 className={styles.movie__year}>{year}</h3>
        <p>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p>
        <ul className={styles.movie__genres}>
          {genres && genres.map((g) => <li key={g}>{g}</li>)}
        </ul>
      </div>
    </div>
  );
}

Movie.propType = {
  id: propType.number.isRequired,
  coverImg: propType.string.isRequired,
  title: propType.string.isRequired,
  rating: propType.number.isRequired,
  summary: propType.string.isRequired,
  genres: propType.arrayOf(propType.string),
};

export default Movie;
