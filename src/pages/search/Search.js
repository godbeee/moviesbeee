import { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import SearchForm from "../../components/SearchForm/SearchForm";
import ResultList from "../../components/ResultList/ResultList";
import Pagination from "../../components/Pagination/Pagination";
import requests from "../../requests/Request";
import ModalMovie from "../../components/ModalMovie/ModalMovie";
import classes from "./Search.module.css";
import Youtube from "../../Youtube/Youtube";

function Search() {
  const [searchMovies, setSearchMovies] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [language, setLanguage] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [year, setYear] = useState("");
  const [genreId, setGenreId] = useState("");
  const [current, setCurrent] = useState(1);
  const [pages, setPages] = useState(1);

  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [movie, setMovie] = useState(null);

  function handleShowModal() {
    setShowModal(true);
  }
  function handleCloseModal() {
    setShowModal(false);
  }

  function handleChooseSelectedId(id) {
    setSelectedId(id);
  }

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
      }
    }
    if (selectedId) {
      fetchData();
    }
  }, [selectedId]);

  let releaseDate;
  if (movie?.published_at) {
    releaseDate = new Date(`${movie?.published_at}`);
  }

  let movieInfo = null;
  if (selectedId !== null && searchMovies.length > 0) {
    movieInfo = searchMovies.find((m) => m.id === selectedId);
  }

  let srcImg = `${requests.img}${movieInfo?.poster_path}`;

  function handleUpdateMovies(
    movies,
    keyword,
    language,
    mediaType,
    year,
    genreId,
    current,
    pages
  ) {
    setSearchMovies(movies);
    setKeyword(keyword);
    setLanguage(language);
    setMediaType(mediaType);
    setYear(year);
    setGenreId(genreId);
    setCurrent(current);
    setPages(pages);
  }

  useEffect(() => {
    async function reFetch() {
      const res = await fetch(
        `http://localhost:5000/api/movies/search?page=${current}&&language=${language}&&mediaType=${mediaType}&&year=${year}&&genreId=${genreId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ keyword: keyword }),
        }
      );
      const data = await res.json();
      setSearchMovies(data.results);
      setCurrent(data.page);
      setPages(data.total_pages);
    }

    if (current <= pages) {
      reFetch();
    }
  }, [keyword, current, pages, language, mediaType, year, genreId]);
  return (
    <>
      <div style={{ backgroundColor: "#1B2430", height: "100%" }}>
        <Nav />
        <div style={{ paddingTop: "8rem", paddingBottom: "2rem" }}>
          <SearchForm onSearch={handleUpdateMovies} />
        </div>
        {searchMovies.length > 0 && (
          <ResultList
            onShowModal={handleShowModal}
            onSelectedId={handleChooseSelectedId}
            list={searchMovies}
          />
        )}
        {searchMovies.length > 0 && (
          <Pagination current={current} pages={pages} setCurrent={setCurrent} />
        )}
        {showModal && (
          <ModalMovie onCloseModal={handleCloseModal}>
            <div className={classes.content}>
              <span
                onClick={() => handleCloseModal()}
                className="fa-solid fa-xmark"
              ></span>
              <div className={classes.info}>
                <h2>{movieInfo?.title || movieInfo?.original_title}</h2>
                <hr></hr>
                <div>
                  <p>
                    {" "}
                    Release date:{" "}
                    {releaseDate?.toLocaleDateString("vi-VN") ||
                      "No information"}
                  </p>
                  <p>
                    Vote:{" "}
                    {movieInfo
                      ? movieInfo?.vote_average + " / 10"
                      : "no information"}
                  </p>
                </div>
                <p>{movieInfo?.overview || "No information"}</p>
              </div>
              <div className={classes.video}>
                {Object.keys(movie || {})?.length !== 0 ? (
                  <Youtube keyYt={movie?.key} />
                ) : !srcImg.includes("null") ? (
                  <img
                    alt={movieInfo?.title || movieInfo?.original_title}
                    src={srcImg}
                  />
                ) : (
                  <img
                    alt={movieInfo?.title || movieInfo?.original_title}
                    src={"https://placehold.co/700x500?text=No+Image"}
                  />
                )}
              </div>
            </div>
          </ModalMovie>
        )}
      </div>
    </>
  );
}
export default Search;
