function NoteTitle({ newTitle, setNewTitle, placeholder }) {
  return (
    <>
      <textarea
        className="view-title"
        placeholder="Title. . ."
        value={newTitle}
        onChange={(e) => {
          setNewTitle(e.target.value);
          e.target.style.height = "inherit";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        rows={1}
      ></textarea>
    </>
  );
}

export default NoteTitle;
