import { useState } from "react";
import { useContext } from "react";
import NotesContext from "../../context/NotesContext";
import AddNoteModal from "../modals/AddNoteModal";
import AddIcon from "../../assets/img/Add-button.png";

function AddNote() {
const { newTitle, setNewTitle, newBody, setNewBody, notes, addNote } =
    useContext(NotesContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = async (e) => {
    if (newTitle === "" || newBody === "") {
      alert("Oops! Missing title or content. Please complete your note.");
      return;
    }
    const now = new Date();
    const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

    const newNoteObject = {
      id: crypto.randomUUID(),
      title: newTitle,
      body: newBody,
      date: timestamp,
      favorite: false,
    };

    await addNote(newNoteObject);
    setNewTitle("");
    setNewBody("");
    handleClose();
  };

  return (
    <>
      <div onClick={handleShow}>
        {notes.length > 0 ? (
          <img className="add-btn-2" src={AddIcon} />
        ) : (
          <i
            className="bi bi-plus-square-dotted add-btn-1"
            style={{ fontSize: "clamp(30px, 100vw, 100px)" }}
            title="Add note"
          ></i>
        )}
      </div>

      <AddNoteModal
        modalTitle="➕ Create Note"
        show={show}
        handleSave={handleSave}
        handleClose={handleClose}
        title={newTitle}
        body={newBody}
        setTitle={setNewTitle}
        setBody={setNewBody}
      />
    </>
  );
}

export default AddNote;
