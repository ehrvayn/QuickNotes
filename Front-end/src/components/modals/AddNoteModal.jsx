import Modal from "react-bootstrap/Modal";
import NoteTitle from "../inputs/TitleNote";
import NoteBody from "../inputs/BodyNote";
import { useContext } from "react";
import NotesContext from "../../context/NotesContext";

function AddNoteModal({
  show,
  handleClose,
  handleSave,
  title,
  setTitle,
  body,
  setBody,
}) {
  const { isToggled } = useContext(NotesContext);
  const words = body.trim().split(/\s+/);

  return (
    <>
      <Modal
        className={isToggled ? "dm-view-note" : ""}
        show={show}
        onHide={handleClose}
        size="lg"
        fullscreen
      >
        <Modal.Header
          style={{ flexDirection: "column", alignItems: "stretch" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <i
              className="bi bi-arrow-left fs-2"
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            ></i>
                <i onClick={handleSave} className="bi bi-check-lg fs-2" style={{cursor:"pointer"}} title="save"></i>
            </div>
          <Modal.Title>
            <NoteTitle newTitle={title} setNewTitle={setTitle} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: "110vh",
            minHeight: "auto",
            overflowY: "hidden",
            padding: "15px",
          }}
        >
          <div className="d-flex justify-content-between">
            <p style={{ opacity: 0.5, fontSize: "small" }}>
              Characters: {body.length}
            </p>
            <p style={{ opacity: 0.5, fontSize: "small" }}>
              Words: {words.length}
            </p>
          </div>
          <NoteBody newBody={body} setNewBody={setBody} />
        </Modal.Body>
        <Modal.Footer style={{ padding: "10px 15px" }}>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <small className="date">➕ Created Note</small>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNoteModal;
