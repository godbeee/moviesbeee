import ResultItem from "../ResultItem/ResultItem";
import classes from "./ResultList.module.css";

function ResultList({ list, onShowModal, onSelectedId }) {
  return (
    <div style={{ padding: "2rem" }}>
      {list.length > 0 && (
        <h3 style={{ color: "#fff", marginBottom: "1.5rem" }}>Search Result</h3>
      )}
      <div className={classes.results}>
        {list.map((movie) => (
          <ResultItem
            onSelectedId={onSelectedId}
            onShowModal={onShowModal}
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
}

export default ResultList;
