function NoteBody({ newBody, setNewBody }) {
  return (
    <>
      <textarea
        className="view-body"
        placeholder="Type here. . ."
        value={newBody}
        onChange={(e) => setNewBody(e.target.value)}
      ></textarea>
    </>
  );
}

export default NoteBody;
