import classes from "./ResultItem.module.css";
import requests from "../../requests/Request";

function ResultItem({ movie, onShowModal, onSelectedId }) {
  const srcImg = `${requests.img}${movie?.poster_path}`;

  function handleClick() {
    onShowModal();
    onSelectedId(movie.id);
  }

  if (movie?.poster_path) {
    return (
      <>
        <div onClick={handleClick} className={classes.result}>
          <img src={srcImg} alt={movie.title} />
        </div>
      </>
    );
  } else {
    return (
      <div onClick={handleClick} className={classes.result}>
        <img
          src="https://placehold.jp/3d4070/ffffff/?text=no%20image"
          alt={movie.title}
        />
      </div>
    );
  }
}

export default ResultItem;
