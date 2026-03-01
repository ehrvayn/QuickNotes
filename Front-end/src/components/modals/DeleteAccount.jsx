import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteAccountModal({ handleClose, handleDelete, show }) {
  return (
    <>
      <Modal show={show} size="sm" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account? <i className="bi bi-exclamation-triangle"></i></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>permanently delete</span>{" "}
          your account? This cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteAccountModal;