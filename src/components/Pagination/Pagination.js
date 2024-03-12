import { Link } from "react-router-dom";
import classes from "./Pagination.module.css";

function Pagination({ current, pages, setCurrent }) {
  function handlePreClick() {
    if (Number(current) === 1) return;
    setCurrent((pre) => Number(pre) - 1);
  }
  function handleNextClick() {
    if (current < pages) {
      setCurrent((pre) => Number(pre) + 1);
    }
  }
  let pagination;
  if (pages > 0) {
    pagination = (
      <nav>
        <ul className={classes.pagination}>
          <li
            onClick={handlePreClick}
            disabled={Number(current) === 1}
            className={`${classes.pageItem}`}
          >
            <Link className={classes.pageLink}>Previous</Link>
          </li>
          <li className={classes.pageItem}>
            <Link className={classes.pageLink}>{current}</Link>
          </li>
          <li
            disabled={Number(current) === pages}
            onClick={handleNextClick}
            className={classes.pageItem}
          >
            <Link className={classes.pageLink}>Next</Link>
          </li>
        </ul>
      </nav>
    );
  }
  return <>{pagination}</>;
}

export default Pagination;
