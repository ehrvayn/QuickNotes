import Dropdown from 'react-bootstrap/Dropdown';

function SortNotes({ handleNewest, handleOldest, sortName }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary">
        {sortName}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleNewest}>
          Newest
        </Dropdown.Item>
        <Dropdown.Item onClick={handleOldest}>
          Oldest
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortNotes;