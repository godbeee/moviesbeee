import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import { useEffect, useState } from "react";
import requests from "../../requests/Request";
import classes from "./MovieList.module.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import MovieItem from "../MovieItem/MovieItem";
import MovieDetail from "../MovieDetail/MovieDetail";
import Pagination from "../Pagination/Pagination";

function MovieList({ urlData, isPoster, title }) {
  const [list, setList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [current, setCurrent] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(urlData + "?page=" + current);
      const data = await res.json();
      if (!data.message) {
        setList(data.results);
        setCurrent(data.page);
        setPages(data.total_pages);
      }
    }
    if (urlData) fetchData();
  }, [current]);

  let selectedMovie;
  if (selectedId) {
    selectedMovie = list.find((item) => item.id === selectedId);
  }

  return (
    <>
      {title && list.length > 0 && (
        <h3 style={{ marginTop: "4rem", color: "#fff", fontSize: "2rem" }}>
          {title}
        </h3>
      )}
      {list.length > 0 && (
        <Swiper
          slidesPerView={1}
          modules={[Scrollbar]}
          scrollbar={true}
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: isPoster ? 10 : 7,
              spaceBetween: 10,
            },
          }}
        >
          {list?.map((item, i) => (
            <SwiperSlide key={i}>
              <MovieItem
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                movie={item}
                isPoster={isPoster}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {list.length > 0 && (
        <Pagination setCurrent={setCurrent} current={current} pages={pages} />
      )}
      {selectedId && (
        <MovieDetail
          isPoster={isPoster}
          selectedMovie={selectedMovie}
          selectedId={selectedId}
        />
      )}
    </>
  );
}

export default MovieList;
