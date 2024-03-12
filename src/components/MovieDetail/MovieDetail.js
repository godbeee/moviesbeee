import { useEffect, useState } from "react";
import classes from "./MovieDetail..module.css";
import { apiKey } from "../../requests/Request";
import Youtube from "../../Youtube/Youtube";
import requests from "../../requests/Request";

function MovieDetail({ selectedId, selectedMovie, isPoster }) {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://moviebeee-api.onrender.com/api/movies/video",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filmId: selectedId }),
        }
      );
      const data = await res.json();
      if (data.result) {
        setMovie(data.result);
        setError(false);
      } else {
        setError(true);
      }
    }
    if (selectedId) {
      fetchData().catch((err) => setError(true));
    }
  }, [selectedId]);

  let releaseDate;
  if (movie?.published_at) {
    releaseDate = new Date(`${movie?.published_at}`);
  }

  const srcImg = `${requests.img}${selectedMovie?.backdrop_path}`;

  if (!error) {
    return (
      <div className={classes.detail}>
        <div>
          <h2>
            {isPoster
              ? selectedMovie?.original_name + ` ( ${selectedMovie?.name} )`
              : selectedMovie?.original_title || selectedMovie?.original_name}
          </h2>
          <hr></hr>
          <div>
            <p>
              Release date:{" "}
              {releaseDate?.toLocaleDateString("vi-VN") || "no information"}
            </p>
            <p>Vote: {selectedMovie?.vote_average}</p>
          </div>
          <p>{selectedMovie?.overview || "Overview: no information"}</p>
        </div>
        <div>
          {Object.keys(movie).length !== 0 && <Youtube keyYt={movie.key} />}
          {Object.keys(movie).length === 0 && (
            <img style={{ width: "100%", height: "100%" }} src={srcImg} />
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.detail}>
        <div>
          <h2>
            {selectedMovie?.name ||
              selectedMovie?.original_name ||
              selectedMovie?.original_title ||
              "No title"}
          </h2>
          <hr></hr>
          <div>
            <p>Release date: no infomation</p>
            <p>Vote: {selectedMovie?.vote_average}</p>
          </div>
          <p>{selectedMovie?.overview || "Overview: no information"}</p>
        </div>
        <div>
          <img style={{ width: "100%", height: "100%" }} src={srcImg} />
        </div>
      </div>
    );
  }
}

export default MovieDetail;
