import { useRef } from "react";
import classes from "./SearchForm.module.css";

function SearchForm({ onSearch }) {
  const searchInputRef = useRef();
  const languageRef = useRef();
  const mediaTypeRef = useRef();
  const yearRef = useRef();
  const genreRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(
      `https://moviebeee-api.onrender.com/api/movies/search?language=${languageRef.current.value}&&mediaType=${mediaTypeRef.current.value}&&year=${yearRef.current.value}&&genreId=${genreRef.current.value}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: searchInputRef.current.value || "" }),
      }
    );

    const data = await res.json();

    onSearch(
      data.results,
      searchInputRef.current.value || "",
      languageRef.current.value || "",
      mediaTypeRef.current.value || "",
      yearRef.current.value || "",
      genreRef.current.value || "",
      data.page || 1,
      data.total_pages || 1
    );
  }

  const handleReset = (e) => {
    e.preventDefault();
    searchInputRef.current.value = "";
    languageRef.current.value = "";
    mediaTypeRef.current.value = "";
    yearRef.current.value = "";
    genreRef.current.value = "";
    onSearch([]);
  };

  return (
    <div className={classes["search-form"]}>
      <form onSubmit={handleSubmit}>
        <select ref={mediaTypeRef}>
          <option value="">media type</option>
          <option value="all">all</option>
          <option value="movie">movie</option>
          <option value="tv">tv</option>
          <option value="person">person</option>
        </select>
        <select ref={languageRef}>
          <option value="">language</option>
          <option value="en">en</option>
          <option value="pl">pl</option>
        </select>
        <select ref={yearRef}>
          <option value="">year</option>
          <option value="2000">2000</option>
          <option value="2001">2001</option>
          <option value="2002">2002</option>
          <option value="2003">2003</option>
          <option value="2004">2004</option>
          <option value="2005">2005</option>
          <option value="2006">2006</option>
          <option value="2007">2007</option>
          <option value="2008">2008</option>
          <option value="2009">2009</option>
          <option value="2010">2010</option>
          <option value="2011">2011</option>
          <option value="2012">2012</option>
          <option value="2013">2013</option>
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
        <select ref={genreRef}>
          <option value="">genre</option>
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
          <option value="99">Documentary</option>
          <option value="18">Drama</option>
          <option value="10751">Family</option>
          <option value="14">Fantasy</option>
          <option value="36">History</option>
          <option value="27">Horror</option>
          <option value="10402">Music</option>
          <option value="9648">Mystery</option>
          <option value="10749">Romance</option>
          <option value="878">Science Fiction</option>
          <option value="10770">TV Movie</option>
          <option value="53">Thriller</option>
          <option value="10752">War</option>
          <option value="37">Western</option>
        </select>
        <div className={classes["form-content"]}>
          <input ref={searchInputRef} placeholder="Search..." />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              className={`bi bi-search ${classes.search}`}
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
        <hr />
        <div className={classes["form-footer"]}>
          <button onClick={handleReset}>Reset</button>
          <button>Search</button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
