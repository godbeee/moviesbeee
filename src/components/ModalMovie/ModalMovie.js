import classes from "./ModalMovie.module.css";
import { createPortal } from "react-dom";

function BackDrop({ onCloseModal }) {
  function handleClick() {
    onCloseModal();
  }
  return <div onClick={handleClick} className={classes.backdrop}></div>;
}

function Modal({ children }) {
  return <div className={classes.modal}>{children}</div>;
}

function ModalMovie({ children, onCloseModal }) {
  return (
    <div>
      {createPortal(
        <BackDrop onCloseModal={onCloseModal} />,
        document.getElementById("backdrop")
      )}
      {createPortal(
        <Modal>{children}</Modal>,
        document.getElementById("modal")
      )}
    </div>
  );
}

export default ModalMovie;
