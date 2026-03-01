  import { useContext } from "react";
  import NotesContext from "../../context/NotesContext";

  function SearchNote() {
    const { search, setSearch } = useContext(NotesContext);

    return (
      <>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="form-control"
          placeholder="🔍 Search Note"
        />
      </>
    );
  }

  export default SearchNote;
