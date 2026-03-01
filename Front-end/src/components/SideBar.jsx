import logoImg from "../assets/img/Logo.png";
import DarkMode from "./DarkMode";
import Logout from "../route/Logout";
import Login from "../route/Login";
import { useNavigate } from "react-router-dom";
import {
  UserRoundCog,
  Star,
  NotebookPen,
  Moon,
  BadgeQuestionMark,
} from "lucide-react";

function SideBar({ activeView, setActiveView, onClose }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleAllNotes = () => {
    setActiveView("all");
    navigate(`/`);
    if (onClose) onClose();
  };

  const handleFavorites = () => {
    setActiveView("favorites");
    navigate(`/favorites`);
    if (onClose) onClose();
  };

  const handleHelp = () => {
    setActiveView("help");
    navigate(`/help`);
    if (onClose) onClose();
  };

  const handleRoute = () => {
    setActiveView("account-settings");
    navigate(`/accountSettings`);
  };

  return (
    <>
      <div className="sidebar">
        <img src={logoImg} alt="Logo" />
        <nav className="sidebar-nav">
          <button className={`nav-item-dm d-flex`}>
            <div>
              <Moon size={18} /> Darkmode
            </div>
            <DarkMode />
          </button>
          <button
            className={`nav-item ${activeView === "all" ? "active" : ""}`}
            onClick={handleAllNotes}
          >
            <NotebookPen size={18} /> All Notes
          </button>
          <button
            className={`nav-item ${activeView === "favorites" ? "active" : ""}`}
            onClick={handleFavorites}
          >
            <Star size={18} /> Favorites
          </button>
          {token && (
            <button
              className={`nav-item ${activeView === "account-settings" ? "active" : ""}`}
              onClick={handleRoute}
            >
              <UserRoundCog size={18} /> Account Settings
            </button>
          )}
          <button
            className={`nav-item ${activeView === "help" ? "active" : ""}`}
            onClick={handleHelp}
          >
            <BadgeQuestionMark size={18} /> Help
          </button>
          {token ? <Logout /> : <Login />}
          {!token && <div className="guest-mode-indicator">Guest Mode</div>}
        </nav>
        <div className="sidebar-footer">v2.0</div>
      </div>
    </>
  );
}

export default SideBar;
