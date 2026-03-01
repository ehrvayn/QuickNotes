import "../assets/styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import LoginContext from "../context/LoginContext";
import NotesContext from "../context/NotesContext";
import Register from "../route/Register";
import Logo from "../assets/img/Logo.png";

function Login() {
  const navigate = useNavigate();
  const { syncAuth } = useContext(NotesContext);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const loginBtnRef = useRef(null);

  const {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isRegistering,
    setIsRegistering,
  } = useContext(LoginContext);

  useEffect(() => {
    if (!isRegistering && loginBtnRef.current) {
      loginBtnRef.current.focus();
    }
  }, [isRegistering]);

  const login = async () => {
    if (!username) { setIsSuccess(false); setMessage("Username is required!"); return; }
    if (!password) { setIsSuccess(false); setMessage("Password is required!"); return; }

    try {
      let response = await fetch("https://quicknotesbackend-wgu7.onrender.com/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        syncAuth(data.token);
        navigate("/");
        setUsername("");
        setPassword("");
      } else {
        setIsSuccess(false);
        setMessage(data.message);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="sign-in-container">
      <div className="brand-side">
        <div className="back-arrow" onClick={() => navigate("/")} title="Back to Home">
          <i className="bi bi-arrow-left"></i>
        </div>
        <div className="brand-content">
          <img src={Logo} alt="QuickNotes Logo" className="brand-logo" />
          <div>
            <h1 className="title">QuickNotes</h1>
            <p>Capture what's on your mind.</p>
          </div>
        </div>
      </div>

      <div className="sign-in-wrapper">
        <div className="form-box">
          <div className="form-header">
            <h2>{isRegistering ? "Create Account" : "Sign In"}</h2>
          </div>

          <div className="input-wrapper">
            {isRegistering && (
              <div className="name-inputs">
                <input placeholder="Firstname" type="text" value={firstname}
                  onChange={(e) => setFirstname(e.target.value)} />
                <input placeholder="Lastname" type="text" value={lastname}
                  onChange={(e) => setLastname(e.target.value)} />
              </div>
            )}

            <input className="full-input" placeholder="Username" type="text" value={username}
              onChange={(e) => { setUsername(e.target.value); setMessage(null); }} />

            <div className="password-field-container">
              <input className="full-input" placeholder="Password"
                type={showPassword ? "text" : "password"} value={password}
                onChange={(e) => { setPassword(e.target.value); setMessage(null); }}
                onKeyDown={(e) => e.key === "Enter" && !isRegistering && loginBtnRef.current.click()}
              />
              <span className="toggle-text" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "HIDE" : "SHOW"}
              </span>
            </div>

            {isRegistering && (
              <div className="password-field-container">
                <input className="full-input" placeholder="Confirm password"
                  type={showPassword ? "text" : "password"} value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            )}
          </div>

          {/* Inline message */}
          {!isRegistering && message && (
            <p className={`inline-message ${isSuccess ? "inline-success" : "inline-error"}`}>
              {message}
            </p>
          )}

          <div className="btn-wrapper">
            {!isRegistering ? (
              <>
                <button className="login-btn" onClick={login} ref={loginBtnRef}>
                  Log-in
                </button>
                <p className="switch-text">
                  New here?{" "}
                  <span onClick={() => { setIsRegistering(true); setMessage(null); }}>Register</span>
                </p>
              </>
            ) : (
              <Register />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;