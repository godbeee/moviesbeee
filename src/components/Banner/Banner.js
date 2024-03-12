import { useEffect, useState } from "react";
import classes from "./Banner.module.css";
import requests from "../../requests/Request";

function Banner() {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(requests.fetchTrending);
      const data = await res.json();
      const banner =
        data.results[Math.floor(Math.random() * data.results.length - 1)];
      setBanner(banner);
    }
    fetchData();
  }, []);

  const style = {
    backgroundImage: `url(${
      banner?.backdrop_path ? requests.img + banner.backdrop_path : ""
    })`,
  };
  return (
    <div style={style} className={classes.banner}>
      <div className={classes["text-box"]}>
        <h2>{banner?.name}</h2>
        <button>Play</button>
        <button>My List</button>
        <p>
          {banner?.overview?.length > 200
            ? banner?.overview?.slice(0, 200) + "..."
            : banner?.overview}
        </p>
      </div>
    </div>
  );
}

export default Banner;
