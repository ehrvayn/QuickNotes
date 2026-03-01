import { useContext, useState, useEffect, useRef } from "react";
import NotesContext from "../../context/NotesContext";
import WarningModal from "../modals/WarningModal";

function RemoveNote({ NoteToremove }) {
  const { setNotes, deleteNote } = useContext(NotesContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemove = () => {
    deleteNote(NoteToremove);
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
      <i
        className="bi bi-trash3-fill fs-4 remove-btn"
        onClick={handleShow}
        style={{ cursor: "pointer" }}
      ></i>

      <WarningModal show={show} handleClose={handleClose} handleRemove={handleRemove} yesBtnRef={yesBtnRef} text="Delete"/>
    </>
  );
}

export default RemoveNote;
