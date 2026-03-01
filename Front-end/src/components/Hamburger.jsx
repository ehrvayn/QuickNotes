import SideBar from "./SideBar";
import { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

function Hamburger({ activeView, setActiveView }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 905) {
        setShow(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <i
        className="bi bi-list hamburger"
        role="button"
        onClick={handleShow}
        style={{ cursor: "pointer" }}
      ></i>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="start"
        style={{
          width: "40vw",
          maxWidth: "250px",
          minWidth: "180px",
          overflow: "hidden",
        }}
      >
        <Offcanvas.Body style={{ padding: "0", overflow: "hidden" }}>
          <SideBar
            activeView={activeView}
            setActiveView={setActiveView}
            onClose={handleClose}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Hamburger;
