import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import LogoutModal from "../components/modals/LogoutModal";
import NotesContext from "../context/NotesContext";

function Logout() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { syncAuth } = useContext(NotesContext);
  const navigate = useNavigate();

  const yesBtnRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    syncAuth(null)
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (show && yesBtnRef.current) {
      yesBtnRef.current.focus();
    }
  }, [show]);
  return (
    <>
      <button className={`nav-item`} onClick={handleShow}>
        <LogOut size={18} /> Logout
      </button>
      <LogoutModal
        show={show}
        handleClose={handleClose}
        handleLogout={handleLogout}
        yesBtnRef={yesBtnRef}
      />
    </>
  );
}

export default Logout;
