import requests from "../../requests/Request";
import classes from "./MovieItem.module.css";

function MovieItem({ movie, setSelectedId, selectedId, isPoster = true }) {
  function handleClick(id) {
    if (movie.id === selectedId) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  }

  if (isPoster) {
    if (movie?.poster_path) {
      const srcImg = `${requests.img}${movie?.poster_path}`;
      return (
        <div onClick={() => handleClick(movie.id)} className={classes.movie}>
          <img style={{ width: "100%", height: "100%" }} src={srcImg} />
        </div>
      );
    } else {
      return (
        <div onClick={() => handleClick(movie.id)} className={classes.movie}>
          <img
            style={{ width: "100%", height: "100%" }}
            src="https://placehold.jp/3d4070/ffffff/150x225.png?text=no%20image"
          />
        </div>
      );
    }
  } else {
    if (movie?.backdrop_path) {
      const srcImg = `${requests.img}${movie?.backdrop_path}`;
      return (
        <div onClick={() => handleClick(movie.id)} className={classes.movie}>
          <img style={{ width: "100%", height: "100%" }} src={srcImg} />
        </div>
      );
    } else {
      return (
        <div onClick={() => handleClick(movie.id)} className={classes.movie}>
          <img
            style={{ width: "100%", height: "100%" }}
            src="https://placehold.jp/3d4070/ffffff/212x118.png?text=no%20image"
          />
        </div>
      );
    }
  }
}

export default MovieItem;
