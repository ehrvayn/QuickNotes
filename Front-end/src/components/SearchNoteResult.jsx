import { useContext, useState, useRef, useEffect } from "react";
import NotesContext from "../context/NotesContext";
import RemoveNote from "./crud/RemoveNote";
import FavoriteNote from "./StarIcon";
import EditNoteModal from "./modals/EditNoteModal";

function SearchNoteResult({ notesToSearch = null, order }) {
  const { notes, search, setSelectedNoteId } = useContext(NotesContext);
  const [searchResult, setSearchResult] = useState([]);
  const colors = ["color1", "color2", "color3"];

  const sourceNotes = notesToSearch || notes;

  useEffect(() => {
    if (search.trim() === "") {
      setSearchResult([]);
    } else {
      const result = sourceNotes.filter((note) =>
        note.title.toLowerCase().startsWith(search.toLowerCase()),
      );
      setSearchResult(result);
      const sorted = order === "Newest" ? [...result].reverse() : result;
      setSearchResult(sorted);
    }
  }, [search, sourceNotes, order]);

  return (
    <>
      <div className="note-container">
        {searchResult.length > 0
          ? searchResult.map((note, i) => (
              <div
                className={`note-card ${colors[i % 3]}`}
                key={note.id}
                onClick={() => setSelectedNoteId(note.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="card-header d-flex justify-content-between">
                  <h4 className="card-title">{note.title}</h4>
                  <div onClick={(e) => e.stopPropagation()}>
                    <RemoveNote NoteToremove={note.id} />
                  </div>
                </div>
                <hr />
                <div className="card-body">
                  <p className="card-text">{note.body}</p>
                </div>
                <hr />
                <div
                  className="card-footer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <small className="text-muted">{note.date}</small>
                  <FavoriteNote noteId={note.id} />
                </div>
              </div>
            ))
          : search && `${search} is not Found!`}
      </div>
      <EditNoteModal />
    </>
  );
}

export default SearchNoteResult;
