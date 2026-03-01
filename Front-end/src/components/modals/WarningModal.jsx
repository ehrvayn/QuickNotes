import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function WarningModal({ handleClose, handleRemove, show, yesBtnRef, text }) {
  return (
    <>
      <Modal show={show} size="sm" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{text}? <i className="bi bi-exclamation-triangle"></i></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>{text}</span> your
          Note? 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleRemove} ref={yesBtnRef}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default WarningModal;