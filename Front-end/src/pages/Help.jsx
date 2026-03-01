import "../assets/styles/App.css";
import "../assets/styles/MediaQueries.css";
import "../assets/styles/DarkMode.css";
import { useContext, useEffect } from "react";
import SideBar from "../components/SideBar";
import NotesContext from "../context/NotesContext";
import Hamburger from "../components/Hamburger";
import ScrollToTop from "../components/ScrollToTop";
import Message from "../components/Message";
import logoImg from "../assets/img/Logo.png";

function Help() {
  const { isToggled, setSearch } = useContext(NotesContext);

  useEffect(() => {
    setSearch("");
  }, []);

  return (
    <div className={`app-layout ${isToggled ? "dark-mode" : ""}`}>
      <SideBar activeView="help" setActiveView={() => {}} />
      <div className="main-content">
        <div className="header">
          <div className="hamburger-container">
            <Hamburger activeView="help" setActiveView={() => {}} />
          </div>
        </div>
        <div className="help-container-parent">
          <div className="help-container">
            <header
              className="help-header"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <h1 style={{ textAlign: "center" }}>
                <span
                  style={{
                    color: "#67e767",
                    textShadow: "0px 2px 2px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <img className="logo" src={logoImg} />
                  QuickNotes
                </span>
              </h1>
              <p style={{ textAlign: "center" }}>
                Welcome to your personal digital notebook! This application is
                designed to help you capture, organize, and manage your thoughts
                quickly and efficiently — and now with an account, your notes
                go wherever you do.
              </p>
              <hr />
            </header>

            <section className="help-section">
              <h2>✨ Features</h2>
              <ul className="help-list">
                <li>
                  <strong>Account & Cloud Sync:</strong> Create an account to
                  securely store your notes in the cloud and access them from
                  any device or browser.
                </li>
                <li>
                  <strong>Quick Note Creation:</strong> Click the + button to
                  instantly add a new note with a title and body.
                </li>
                <li>
                  <strong>Edit & Update:</strong> Click on any note card to open
                  and edit its content in a fullscreen modal.
                </li>
                <li>
                  <strong>Smart Sorting:</strong> Toggle your view between
                  Newest and Oldest notes instantly.
                </li>
                <li>
                  <strong>Favorites:</strong> Star important notes to keep them
                  easily accessible in the Favorites tab.
                </li>
                <li>
                  <strong>Search:</strong> Find specific notes instantly using
                  the search bar.
                </li>
                <li>
                  <strong>Delete All:</strong> Clean up your workspace instantly
                  using the red trash can icon in the toolbar.
                </li>
              </ul>
            </section>

            <section className="help-section">
              <hr />
              <h2>🚀 How to Use</h2>

              <div className="how-to-item">
                <h5>1. Creating an Account / Logging In</h5>
                <p>
                  Click <strong>Register</strong> to create a free account using
                  your username and a password. Once registered, log in from any
                  device and your notes will be waiting for you. If you already
                  have an account, just click <strong>Log In</strong> and pick
                  up right where you left off.
                </p>
              </div>

              <div className="how-to-item">
                <h5>2. Creating a Note</h5>
                <p>
                  Click on the + button in the top toolbar to open the creation
                  modal. Enter a title and your content, then click{" "}
                  <strong>Save</strong>. Your note is instantly saved to your
                  account in the cloud.
                </p>
              </div>

              <div className="how-to-item">
                <h5>3. Editing a Note</h5>
                <p>
                  Click anywhere on a note card to open it in fullscreen edit
                  mode. Modify the title or body, then simply click the{" "}
                  <i className="bi bi-arrow-left fs-4"></i> icon to apply
                  changes.
                </p>
              </div>

              <div className="how-to-item">
                <h5>4. Searching for Notes</h5>
                <p>
                  Type in the search bar <i className="bi bi-search"></i> at the
                  top to filter notes by title. The search is instant and will
                  show matching results as you type. Results will match notes
                  that start with your search term.
                </p>
              </div>

              <div className="how-to-item">
                <h5>5. Sorting Your Notes</h5>
                <p>
                  Use the <strong>Sort</strong> dropdown menu in the toolbar to
                  change the display order. Select <strong>Newest</strong> to
                  see your most recent entries first, or
                  <strong> Oldest</strong> to see your notes in the order they
                  were created.
                </p>
              </div>

              <div className="how-to-item">
                <h5>6. Favoriting Notes</h5>
                <p>
                  Click the star <i className="bi bi-star-fill "></i> icon on
                  any note card. A filled yellow star means it is favorited and
                  will appear in the Favorites page.
                </p>
              </div>

              <div className="how-to-item">
                <h5>7. Deleting Notes</h5>
                <p>
                  <strong>Delete Individual Notes:</strong> Click the trash{" "}
                  <i className="bi bi-trash"></i> icon on a specific note card,
                  or open the note and use the trash icon below.
                </p>
                <p>
                  <strong>Delete All Notes:</strong> Click the red trash{" "}
                  <i className="bi bi-trash text-danger"></i> icon in the top
                  toolbar to delete all notes after confirmation.
                </p>
              </div>
              <hr />
            </section>

            <section className="help-section tips-section">
              <h2>💡 Tips</h2>
              <p>Keep your titles short and descriptive.</p>
              <p>Use the search bar if you have a large number of notes.</p>
              <p>
                Use the <strong>Sort</strong> feature to quickly find your very
                first notes!
              </p>
              <p>
                Log in to sync your notes across all your devices — your notes
                are stored securely in the cloud, not just on this browser.
              </p>
              <p>
                You can still use QuickNotes offline; your changes will sync
                once you're back online.
              </p>
            </section>
          </div>
          <Message />
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}

export default Help;