import propType from "prop-types";
import { Link } from "react-router-dom";

function Movie({ id, coverImg, title, rating, summary, genres }) {
  return (
    <div>
      <img src={coverImg} alt={title} />
      <h2>
        <Link to={`/movie/${id}`}>{title}</Link>
      </h2>
      <span>rating: {rating}</span>
      <p>{summary}</p>
      <ul>{genres && genres.map((g) => <li key={g}>{g}</li>)}</ul>
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
