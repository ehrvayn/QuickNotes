import "../assets/styles/App.css";
import "../assets/styles/MediaQueries.css";
import "../assets/styles/DarkMode.css";
import { useContext, useEffect } from "react";
import SideBar from "../components/SideBar";
import NotesContext from "../context/NotesContext";
import Hamburger from "../components/Hamburger";
import ScrollToTop from "../components/ScrollToTop";
import SearchNote from "../components/inputs/SearchNote";
import SearchNoteResult from "../components/SearchNoteResult";
import DeleteAllNotes from "../components/crud/DeleteAllNotes";
import SortNotes from "../components/SortNotes";
import AddNote from "../components/crud/AddNote";
import EmptyContainer from "../components/EmptyContainer";
import RemoveNote from "../components/crud/RemoveNote";
import FavoriteNote from "../components/StarIcon";
import EditNoteModal from "../components/modals/EditNoteModal";

function Home() {
  const {
    setSearch,
    isToggled,
    notes,
    search,
    order,
    handleNewest,
    handleOldest,
    setSelectedNoteId,
  } = useContext(NotesContext);

  useEffect(() => {
    setSearch("");
  }, [setSearch]);

  const colors = ["color1", "color2", "color3"];
  const sortedNote =
    order === "Newest" ? [...(notes || [])].reverse() : [...(notes || [])];
  if (notes === null) return null;

  return (
    <div className={`app-layout ${isToggled ? "dark-mode" : ""}`}>
      <SideBar activeView="all" setActiveView={() => {}} />
      <div className="main-content">
        <div className="header">
          <div className="hamburger-container">
            <Hamburger activeView="all" setActiveView={() => {}} />
          </div>
          <div className="title-container">
            <h1 className="title">
              <span className="title-half">Capture</span> what's on your mind!
            </h1>
          </div>
        </div>
        <div className="tools-container">
          <div className="search-container">
            <SearchNote />
          </div>
          <div className="tools-btn-container">
            {notes.length > 0 && <AddNote />}
            <DeleteAllNotes />
            <SortNotes
              sortName={order}
              handleNewest={handleNewest}
              handleOldest={handleOldest}
            />
          </div>
        </div>
        <div className="note-container-parent">
          {notes.length > 0 && <h1 className="recent">Recent note</h1>}
          {!search ? (
            <div className="note-container">
              {notes.length > 0 ? (
                sortedNote.map((note, i) => {
                  const uniqueId = note.id || note._id;
                  return (
                    <div
                      className={`note-card ${colors[i % 3]}`}
                      key={uniqueId}
                      onClick={() => setSelectedNoteId(uniqueId)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card-header d-flex justify-content-between">
                        <h4 className="card-title">{note.title}</h4>
                        <div className="note-tools">
                          <div onClick={(e) => e.stopPropagation()}>
                            <RemoveNote NoteToremove={uniqueId} />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="card-body">
                        <p className="card-text">{note.body}</p>
                      </div>
                      <hr />
                      <div className="card-footer">
                        <small className="text-muted">
                          Created:{" "}
                          {note.date ||
                            (note.created_at
                              ? new Date(note.created_at).toLocaleDateString()
                              : "Just now")}
                        </small>
                        <div onClick={(e) => e.stopPropagation()}>
                          <FavoriteNote noteId={uniqueId} />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="empty-container-parent">
                  <div className="empty-container">
                    <EmptyContainer
                      text1="Nothing here yet"
                      text2="Ready for your first note?"
                    />
                    <AddNote />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <SearchNoteResult order={order} />
          )}
        </div>
        <EditNoteModal />
      </div>
      <ScrollToTop />
      
    </div>
  );
}

export default Home;
