import SideBar from "../components/SideBar";
import { useContext, useState, useEffect } from "react";
import NotesContext from "../context/NotesContext";
import Hamburger from "../components/Hamburger";
import { jwtDecode } from "jwt-decode";
import { UserRoundCog, Eye, EyeOff } from "lucide-react";
import DeleteAccountModal from "../components/modals/DeleteAccount";

function AccountSettings() {
  const { isToggled, setActiveView } = useContext(NotesContext);

  const [activeButton1, setActiveButton1] = useState(true);
  const [activeButton2, setActiveButton2] = useState(true);
  const [activeButton3, setActiveButton3] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullnameMsg, setFullnameMsg] = useState(null);
  const [fullnameMsgSuccess, setFullnameMsgSuccess] = useState(false);
  const [usernameMsg, setUsernameMsg] = useState(null);
  const [usernameMsgSuccess, setUsernameMsgSuccess] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState(null);
  const [passwordMsgSuccess, setPasswordMsgSuccess] = useState(false);

  const [loadingFullname, setLoadingFullname] = useState(false);
  const [loadingUsername, setLoadingUsername] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const getPasswordStrength = (pwd) => {
    if (!pwd) return null;
    if (pwd.length < 8) return { label: "Weak", level: 1 };
    if (
      pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&
      /[0-9]/.test(pwd) &&
      /[^a-zA-Z0-9]/.test(pwd)
    )
      return { label: "Strong", level: 3 };
    if (pwd.length >= 8) return { label: "Medium", level: 2 };
    return { label: "Weak", level: 1 };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setId(decoded.id);
      retrieve(decoded.id);
    }
  }, []);

  const retrieve = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      let response = await fetch(
        `https://quicknotesbackend-e5oz.onrender.com/users/retrieve/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();
      if (data.success) {
        setUsername(data.user.username);
        setFirstname(data.user.firstname);
        setLastname(data.user.lastname);
        setNewUsername(data.user.username);
        setNewFirstname(data.user.firstname);
        setNewLastname(data.user.lastname);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelFullname = () => {
    setNewFirstname(firstname);
    setNewLastname(lastname);
    setFullnameMsg(null);
    setActiveButton1(true);
  };

  const cancelUsername = () => {
    setNewUsername(username);
    setUsernameMsg(null);
    setActiveButton2(true);
  };

  const cancelPassword = () => {
    setNewPassword("");
    setConfirmPassword("");
    setPasswordMsg(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setActiveButton3(true);
  };

  const updateUsername = async () => {
    if (!newUsername) {
      setUsernameMsgSuccess(false);
      setUsernameMsg("Username can't be blank!");
      return;
    }
    if (newUsername.length < 5) {
      setUsernameMsgSuccess(false);
      setUsernameMsg("Username must be at least 5 characters!");
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(newUsername)) {
      setUsernameMsgSuccess(false);
      setUsernameMsg("Username can only contain letters and numbers!");
      return;
    }

    setLoadingUsername(true);
    try {
      const token = localStorage.getItem("token");
      let response = await fetch(
        "https://quicknotesbackend-e5oz.onrender.com/users/update/username",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id, username: newUsername }),
        },
      );
      const data = await response.json();
      if (data.success) {
        setUsername(newUsername);
        setUsernameMsgSuccess(true);
        setUsernameMsg("Username updated successfully!");
        setTimeout(() => {
          setActiveButton2(true);
          setUsernameMsg(null);
        }, 1500);
      } else {
        setUsernameMsgSuccess(false);
        setUsernameMsg(data.message);
      }
    } catch (error) {
      setUsernameMsgSuccess(false);
      setUsernameMsg("Something went wrong. Please try again.");
    } finally {
      setLoadingUsername(false);
    }
  };

  const updateFullname = async () => {
    if (!newFirstname) {
      setFullnameMsgSuccess(false);
      setFullnameMsg("First name can't be blank!");
      return;
    }
    if (!newLastname) {
      setFullnameMsgSuccess(false);
      setFullnameMsg("Last name can't be blank!");
      return;
    }
    if (!/^[a-zA-Z\s-]+$/.test(newFirstname)) {
      setFullnameMsgSuccess(false);
      setFullnameMsg("First name can only contain letters!");
      return;
    }
    if (!/^[a-zA-Z\s-]+$/.test(newLastname)) {
      setFullnameMsgSuccess(false);
      setFullnameMsg("Last name can only contain letters!");
      return;
    }

    setLoadingFullname(true);
    try {
      const token = localStorage.getItem("token");
      let response = await fetch(
        "https://quicknotesbackend-e5oz.onrender.com/users/update/fullname",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id,
            firstname: newFirstname,
            lastname: newLastname,
          }),
        },
      );
      const data = await response.json();
      if (data.success) {
        setFirstname(newFirstname);
        setLastname(newLastname);
        setFullnameMsgSuccess(true);
        setFullnameMsg("Full name updated successfully!");
        setTimeout(() => {
          setActiveButton1(true);
          setFullnameMsg(null);
        }, 1500);
      } else {
        setFullnameMsgSuccess(false);
        setFullnameMsg(data.message);
      }
    } catch (error) {
      setFullnameMsgSuccess(false);
      setFullnameMsg("Something went wrong. Please try again.");
    } finally {
      setLoadingFullname(false);
    }
  };

  const updatePassword = async () => {
    if (!newPassword) {
      setPasswordMsgSuccess(false);
      setPasswordMsg("Please input a password!");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordMsgSuccess(false);
      setPasswordMsg("Password must be at least 8 characters!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsgSuccess(false);
      setPasswordMsg("Passwords do not match!");
      return;
    }

    setLoadingPassword(true);
    try {
      const token = localStorage.getItem("token");
      let response = await fetch(
        "https://quicknotesbackend-e5oz.onrender.com/users/update/password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id, password: newPassword }),
        },
      );
      const data = await response.json();
      if (data.success) {
        setPasswordMsgSuccess(true);
        setPasswordMsg("Password updated successfully!");
        setTimeout(() => {
          setActiveButton3(true);
          setNewPassword("");
          setConfirmPassword("");
          setPasswordMsg(null);
          setShowPassword(false);
          setShowConfirmPassword(false);
        }, 1500);
      } else {
        setPasswordMsgSuccess(false);
        setPasswordMsg(data.message);
      }
    } catch (error) {
      setPasswordMsgSuccess(false);
      setPasswordMsg("Something went wrong. Please try again.");
    } finally {
      setLoadingPassword(false);
    }
  };

  const deleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://quicknotesbackend-e5oz.onrender.com/users/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }),
        },
      );
      const data = await response.json();
      if (data.success) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fullnameUnchanged =
    newFirstname === firstname && newLastname === lastname;
  const usernameUnchanged = newUsername === username;

  return (
    <>
      <div className={`app-layout ${isToggled ? "dark-mode" : ""}`}>
        <SideBar activeView="account-settings" setActiveView={setActiveView} />
        <div className="main-content">
          <div className="account-settings-container">
            <div className="header">
              <div className="hamburger-container">
                <Hamburger
                  activeView="account-settings"
                  setActiveView={() => {}}
                />
              </div>
            </div>
            <div className="account-settings-wrapper">
              <h2 className="account-settings-title">
                Account Settings{" "}
                <UserRoundCog
                  style={{
                    width: "clamp(30px, 5vw, 50px)",
                    height: "clamp(30px, 5vw, 50px)",
                  }}
                />
              </h2>

              {/* Full Name */}
              <div className="account-settings-field">
                <div className="field-info">
                  <span className="field-label">Full Name</span>
                  {activeButton1 ? (
                    <span className="field-value">
                      {firstname} {lastname}
                    </span>
                  ) : (
                    <>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <input
                          className="input-field"
                          value={newFirstname}
                          type="text"
                          placeholder="First name"
                          onChange={(e) => {
                            setNewFirstname(e.target.value);
                            setFullnameMsg(null);
                          }}
                        />
                        <input
                          className="input-field"
                          value={newLastname}
                          type="text"
                          placeholder="Last name"
                          onChange={(e) => {
                            setNewLastname(e.target.value);
                            setFullnameMsg(null);
                          }}
                        />
                      </div>
                      {fullnameMsg && (
                        <p
                          className={`inline-message ${fullnameMsgSuccess ? "inline-success" : "inline-error"}`}
                        >
                          {fullnameMsg}
                        </p>
                      )}
                    </>
                  )}
                </div>
                <div className="field-actions">
                  {activeButton1 ? (
                    <button
                      className="field-btn"
                      onClick={() => setActiveButton1(false)}
                    >
                      Edit
                    </button>
                  ) : (
                    <>
                      <button
                        className="field-btn"
                        onClick={updateFullname}
                        disabled={fullnameUnchanged || loadingFullname}
                      >
                        {loadingFullname ? "Saving..." : "Save"}
                      </button>
                      <button
                        className="field-btn cancel-btn"
                        onClick={cancelFullname}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Username */}
              <div className="account-settings-field">
                <div className="field-info">
                  <span className="field-label">Username</span>
                  {activeButton2 ? (
                    <span className="field-value">{username}</span>
                  ) : (
                    <>
                      <input
                        className="input-field"
                        value={newUsername}
                        type="text"
                        onChange={(e) => {
                          setNewUsername(e.target.value);
                          setUsernameMsg(null);
                        }}
                      />
                      {usernameMsg && (
                        <p
                          className={`inline-message ${usernameMsgSuccess ? "inline-success" : "inline-error"}`}
                        >
                          {usernameMsg}
                        </p>
                      )}
                    </>
                  )}
                </div>
                <div className="field-actions">
                  {activeButton2 ? (
                    <button
                      className="field-btn"
                      onClick={() => setActiveButton2(false)}
                    >
                      Edit
                    </button>
                  ) : (
                    <>
                      <button
                        className="field-btn"
                        onClick={updateUsername}
                        disabled={usernameUnchanged || loadingUsername}
                      >
                        {loadingUsername ? "Saving..." : "Save"}
                      </button>
                      <button
                        className="field-btn cancel-btn"
                        onClick={cancelUsername}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="account-settings-field">
                <div className="field-info">
                  <div className="d-flex gap-1 align-items-center">
                    <span className="field-label">Password</span>
                    {!activeButton3 && (
                      <span
                        className="eye-icon"
                        onClick={() => {
                          setShowPassword(!showPassword);
                          setShowConfirmPassword(!showConfirmPassword);
                        }}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </span>
                    )}
                  </div>
                  {activeButton3 ? (
                    <span className="field-value">••••••••</span>
                  ) : (
                    <>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        <div className="password-input-wrapper">
                          <input
                            className="input-field"
                            value={newPassword}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            onChange={(e) => {
                              setNewPassword(e.target.value);
                              setPasswordMsg(null);
                            }}
                          />
                        </div>
                        <div className="password-input-wrapper">
                          <input
                            className="input-field"
                            value={confirmPassword}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                              setPasswordMsg(null);
                            }}
                          />
                        </div>
                      </div>
                      {newPassword && (
                        <div className="password-strength">
                          <div className="strength-bars">
                            <div
                              className={`strength-bar ${passwordStrength.level >= 1 ? `strength-${passwordStrength.label.toLowerCase()}` : ""}`}
                            />
                            <div
                              className={`strength-bar ${passwordStrength.level >= 2 ? `strength-${passwordStrength.label.toLowerCase()}` : ""}`}
                            />
                            <div
                              className={`strength-bar ${passwordStrength.level >= 3 ? `strength-${passwordStrength.label.toLowerCase()}` : ""}`}
                            />
                          </div>
                          <span
                            className={`strength-label strength-${passwordStrength.label.toLowerCase()}-text`}
                          >
                            {passwordStrength.label}
                          </span>
                        </div>
                      )}
                      {passwordMsg && (
                        <p
                          className={`inline-message ${passwordMsgSuccess ? "inline-success" : "inline-error"}`}
                        >
                          {passwordMsg}
                        </p>
                      )}
                    </>
                  )}
                </div>
                <div className="field-actions">
                  {activeButton3 ? (
                    <button
                      className="field-btn"
                      onClick={() => setActiveButton3(false)}
                    >
                      Edit
                    </button>
                  ) : (
                    <>
                      <button
                        className="field-btn"
                        onClick={updatePassword}
                        disabled={loadingPassword}
                      >
                        {loadingPassword ? "Saving..." : "Save"}
                      </button>
                      <button
                        className="field-btn cancel-btn"
                        onClick={cancelPassword}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Danger Zone */}
              <div className="danger-zone">
                <div>
                  <span className="field-label">Delete Account</span>
                  <p className="danger-zone-desc">
                    Permanently delete your account and all your notes. This
                    cannot be undone.
                  </p>
                </div>
                <button
                  className="delete-account-btn"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteAccountModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={deleteAccount}
      />
    </>
  );
}

export default AccountSettings;
