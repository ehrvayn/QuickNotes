import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function LogoutModal({ handleClose, handleLogout, show, yesBtnRef }) {
  return (
    <>
      <Modal show={show} size="sm" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log-out? <i className="bi bi-exclamation-triangle"></i></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>Log-out</span> your
          Account?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleLogout} ref={yesBtnRef}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogoutModal;