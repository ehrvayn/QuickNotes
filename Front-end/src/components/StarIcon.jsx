import { useContext } from "react";
import NotesContext from "../context/NotesContext";

function FavoriteNote({ noteId }) {
  const { notes, addToFavorites } = useContext(NotesContext);

  const thisNote = notes.find((n) => n.id === noteId);

  const handleToggle = (e) => {
    e.stopPropagation();
    
    addToFavorites(noteId, thisNote?.favorite || false);
  };

  return (
    <>
      <i
        className={thisNote?.favorite ? "bi bi-star-fill star2" : "bi bi-star star1"}
        onClick={handleToggle}
        style={{ cursor: "pointer" }}
      ></i>
    </>
  );
}

export default FavoriteNote;