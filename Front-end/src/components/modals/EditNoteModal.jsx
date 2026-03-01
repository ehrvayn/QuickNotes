import { useState, useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import NotesContext from "../../context/NotesContext";
import RemoveNote from "../crud/RemoveNote";
import ScrollToTop from "../ScrollToTop";
import NoteTitle from "../inputs/TitleNote";
import NoteBody from "../inputs/BodyNote";

function EditNoteModal() {
  const { notes, selectedNoteId, setSelectedNoteId, isToggled, updateNote } =
    useContext(NotesContext);
  const [localTitle, setLocalTitle] = useState("");
  const [localBody, setLocalBody] = useState("");
  const currentNote = notes ? notes.find((n) => n.id === selectedNoteId) : null;
  const words = localBody.trim().split(/\s+/);

  useEffect(() => {
    if (currentNote) {
      setLocalTitle(currentNote.title);
      setLocalBody(currentNote.body);
    }
  }, [selectedNoteId, currentNote]);

  const handleSave = async () => {
    if (localTitle === "" || localBody === "") {
      alert("Oops! Missing title or content. Please complete your note.");
      return;
    }
    await updateNote(selectedNoteId, localTitle, localBody);
    setSelectedNoteId(null);
  };

  if (notes === null || !selectedNoteId) return null;

  return (
    <>
      {currentNote && (
        <Modal
          className={isToggled ? "dm-view-note" : ""}
          show={!!selectedNoteId}
          onHide={() => setSelectedNoteId(null)}
          rows={1}
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
                onClick={() => setSelectedNoteId(null)}
                style={{ cursor: "pointer" }}
              ></i>
              <div className="d-flex gap-3 align-items-center">
                <RemoveNote NoteToremove={currentNote.id} />
                <i onClick={handleSave} className="bi bi-check-lg fs-2" style={{cursor:"pointer"}} title="save"></i>
              </div>
            </div>
            <Modal.Title>
              <NoteTitle newTitle={localTitle} setNewTitle={setLocalTitle} />
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
                Characters: {localBody.length}
              </p>
              <p style={{ opacity: 0.5, fontSize: "small" }}>
                Words: {words.length}
              </p>
            </div>
            <NoteBody newBody={localBody} setNewBody={setLocalBody} />
          </Modal.Body>
          <Modal.Footer style={{ padding: "10px 15px" }}>
            <div className="w-100 d-flex justify-content-between align-items-center">
              <small className="date">Created: {currentNote.date}</small>
              <div className="d-flex gap-2">
                <div className="ms-auto d-flex gap-2 fs-2 me-2"></div>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      <ScrollToTop />
    </>
  );
}

export default EditNoteModal;
