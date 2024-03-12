import Banner from "../../components/Banner/Banner";
import MovieList from "../../components/MovieList/MovieList";
import Nav from "../../components/Nav/Nav";
import requests from "../../requests/Request";

function Browse({ error }) {
  return (
    <>
      <Nav />
      <Banner />
      {!error && (
        <div style={{ padding: "3rem 2rem", backgroundColor: "#1B2430" }}>
          <MovieList
            urlData={requests.fetchTrending}
            isPoster={false}
            title={"Xu hướng"}
          />
          <MovieList
            urlData={requests.fetchTopRated}
            isPoster={false}
            title={"Xếp hạng cao"}
          />
          <MovieList
            urlData={requests.fetchActionMovies}
            isPoster={false}
            title={"Hành động"}
          />
          <MovieList
            urlData={requests.fetchAdventureMovies}
            isPoster={false}
            title={"Phiêu lưu"}
          />
          <MovieList
            urlData={requests.fetchAnimationMovies}
            isPoster={false}
            title={"Hoạt hình"}
          />
          <MovieList
            urlData={requests.fetchComedyMovies}
            isPoster={false}
            title={"Hài kịch"}
          />
          <MovieList
            urlData={requests.fetchCrimeMovies}
            isPoster={false}
            title={"Tội phạm"}
          />
          <MovieList
            urlData={requests.fetchDocumentaries}
            isPoster={false}
            title={"Tài liệu"}
          />
          <MovieList
            urlData={requests.fetchDramaMovies}
            isPoster={false}
            title={"Drama"}
          />
          <MovieList
            urlData={requests.fetchFamilyMovies}
            isPoster={false}
            title={"Gia đình"}
          />
          <MovieList
            urlData={requests.fetchFantasyMovies}
            isPoster={false}
            title={"Fantasy"}
          />
          <MovieList
            urlData={requests.fetchHistoryMovies}
            isPoster={false}
            title={"Lịch sử"}
          />
          <MovieList
            urlData={requests.fetchHorrorMovies}
            isPoster={false}
            title={"Kinh dị"}
          />
          <MovieList
            urlData={requests.fetchMusicMovies}
            isPoster={false}
            title={"Âm nhạc"}
          />
          <MovieList
            urlData={requests.fetchMysteryMovies}
            isPoster={false}
            title={"Thần bí"}
          />
          <MovieList
            urlData={requests.fetchRomanceMovies}
            isPoster={false}
            title={"Lãng mạn"}
          />
          <MovieList
            urlData={requests.fetchScienceMovies}
            isPoster={false}
            title={"Khoa học viễn tưởng"}
          />
          <MovieList
            urlData={requests.fetchTvMovies}
            isPoster={false}
            title={"Phim truyền hình"}
          />
          <MovieList
            urlData={requests.fetchThrillerMovies}
            isPoster={false}
            title={"Giật gân"}
          />
          <MovieList
            urlData={requests.fetchWarMovies}
            isPoster={false}
            title={"Chiến tranh"}
          />
          <MovieList
            urlData={requests.fetchWesternMovies}
            isPoster={false}
            title={"Western"}
          />
        </div>
      )}
      {error && <p>fail to fetch data!</p>}
    </>
  );
}

export default Browse;
