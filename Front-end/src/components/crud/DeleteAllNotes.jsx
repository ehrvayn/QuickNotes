import { useContext, useState, useRef, useEffect } from "react";
import NotesContext from "../../context/NotesContext";
import WarningModal from "../modals/WarningModal";
import DeleteAll from "../../assets/img/Delete-all.png";

function DeleteAllNotes() {
  const { setNotes, deleteAllNotes } = useContext(NotesContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemove = () => {
    deleteAllNotes()
    setShow(false);
  };

  const yesBtnRef = useRef(null);

  useEffect(() => {
    if (show && yesBtnRef.current) {
      yesBtnRef.current.focus();
    }
  }, [show]);

  return (
    <>
      <img
        className="bi bi-folder-x delete-all"
        onClick={handleShow}
        src={DeleteAll}
      />

      <WarningModal
        show={show}
        handleClose={handleClose}
        handleRemove={handleRemove}
        yesBtnRef={yesBtnRef}
        text="Delete All"
      />
    </>
  );
}

export default DeleteAllNotes;
