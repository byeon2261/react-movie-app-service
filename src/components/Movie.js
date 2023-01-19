import propType from "prop-types";

function Movie({ coverImg, title, rating, summary, genres }) {
  return (
    <div>
      <img src={coverImg} alt={title} />
      <h2>{title}</h2>
      <span>rating: {rating}</span>
      <p>{summary}</p>
      <ul>{genres && genres.map((g) => <li key={g}>{g}</li>)}</ul>
    </div>
  );
}

Movie.propType = {
  coverImg: propType.string.isRequired,
  title: propType.string.isRequired,
  rating: propType.number.isRequired,
  summary: propType.string.isRequired,
  genres: propType.arrayOf(propType.string),
};

export default Movie;
