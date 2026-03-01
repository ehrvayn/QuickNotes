import { useEffect, useState, useCallback } from "react";
import NotesContext from "./NotesContext";
import { jwtDecode } from "jwt-decode";

function NotesProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [notes, setNotes] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentBody, setCurrentBody] = useState("");
  const [search, setSearch] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [isToggled, setIsToggled] = useState(false);
  const [activeView, setActiveView] = useState("all");
  const [order, setOrder] = useState("Newest");

  const syncAuth = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
      setNotes(null)
    }
    setToken(newToken);
  };

  const fetchNotes = useCallback(async () => {
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      const response = await fetch(
        `https://quicknotesbackend-e5oz.onrender.com/notes/getNotes/${decoded.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 401 || response.status === 403) {
        syncAuth(null);
        return;
      }
      const data = await response.json();
      if (data.success) {
        setNotes(data.notes);
      }
    } catch (error) {
      console.error("Fetch interrupted or server down:", error);
    }
  }, [token]);

  const addNote = async (noteObject) => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const response = await fetch("https://quicknotesbackend-e5oz.onrender.com/notes/addNote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: noteObject.title,
            body: noteObject.body,
            userId: decoded.id,
          }),
        });
        const data = await response.json();
        if (data.success) {
          setNotes((prev) => [...prev, data.note]);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setNotes((prev) => [...prev, { ...noteObject, id: Date.now() }]);
    }
  };

  const updateNote = async (id, title, body) => {
    if (token) {
      try {
        const response = await fetch("https://quicknotesbackend-e5oz.onrender.com/notes/updateNote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id, title, body }),
        });

        const data = await response.json();
        if (data.success) {
          setNotes((prev) => prev.map((n) => (n.id === id ? data.note : n)));
        }
      } catch (error) {
        console.error("Error updating note:", error);
      }
    } else {
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, title, body } : n)),
      );
    }
  };

  const addToFavorites = async (noteId, currentFavoriteStatus) => {
    const newStatus = !currentFavoriteStatus;

    if (token) {
      try {
        const response = await fetch(
          `https://quicknotesbackend-e5oz.onrender.com/notes/addToFavorite/${noteId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ favorite: newStatus }),
          },
        );

        const data = await response.json();

        if (data.success) {
          setNotes((prev) =>
            prev.map((n) => (n.id === noteId ? data.note : n)),
          );
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    } else {
      setNotes((prev) =>
        prev.map((n) => (n.id === noteId ? { ...n, favorite: newStatus } : n)),
      );
    }
  };

  const deleteNote = async (noteId) => {
    if (token) {
      try {
        const response = await fetch(
          `https://quicknotesbackend-e5oz.onrender.com/notes/deleteNote/${noteId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (data.success) {
          setNotes((prev) => prev.filter((n) => n.id !== noteId));
        }
      } catch (error) {
        console.error("Error Deleting Note:", error);
      }
    } else {
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
    }
  };

  const deleteAllNotes = async () => {
    if (token) {
      const decoded = jwtDecode(token);
      try {
        const response = await fetch(
          `https://quicknotesbackend-e5oz.onrender.com/notes/deleteAllNotes/${decoded.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (data.success) {
          setNotes([]);
        }
      } catch (error) {
        console.error("Error Deleting All Note:", error);
      }
    } else {
      setNotes([]);
    }
  };

  const favoriteNotes = notes
    ? notes.filter((note) => note && note.favorite === true)
    : [];
  const handleNewest = () => setOrder("Newest");
  const handleOldest = () => setOrder("Oldest");

  useEffect(() => {
    if (token) {
      fetchNotes();
    } else {
      const saved = localStorage.getItem("allNotes");
      setNotes(saved ? JSON.parse(saved) : []);
    }
  }, [token, fetchNotes]);

  useEffect(() => {
    if (!token && notes !== null && Array.isArray(notes)) {
      localStorage.setItem("allNotes", JSON.stringify(notes));
    }
  }, [notes, token]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        token,
        syncAuth,
        newTitle,
        setNewTitle,
        newBody,
        setNewBody,
        currentTitle,
        setCurrentTitle,
        currentBody,
        setCurrentBody,
        search,
        setSearch,
        favoriteNotes,
        selectedNoteId,
        setSelectedNoteId,
        isToggled,
        setIsToggled,
        activeView,
        setActiveView,
        order,
        setOrder,
        handleNewest,
        handleOldest,
        addNote,
        fetchNotes,
        updateNote,
        addToFavorites,
        deleteNote,
        deleteAllNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export default NotesProvider;
