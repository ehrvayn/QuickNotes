import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Help from "./pages/Help";
import Login from "./pages/Login";
import AccountSettings from "./pages/AccountSettings";
import ProtectedRoute from "./route/ProtectedRoute";
import LoginProvider from "./context/Loginprovider";

function App() {
  const footerStyle = {
    textAlign: "center",
    padding: "20px 0",
    fontSize: "12px",
    fontFamily: "monospace",
    color: "#888",
    borderTop: "1px solid #e0e0e0",
    marginTop: "auto", // Pushes footer to bottom in a flex container
  };

  const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh", // Ensures the page is at least the height of the screen
  };

  return (
    <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginProvider>
                <Login />
              </LoginProvider>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/help" element={<Help />} />
          <Route
            path="/accountSettings"
            element={
              <ProtectedRoute>
                <AccountSettings />
              </ProtectedRoute>
            }
          />
        </Routes>
    </BrowserRouter>
  );
}

export default App;